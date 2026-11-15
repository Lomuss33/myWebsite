/**
 * @description Cloudflare Worker Entrypoint for Project Directive: The Grain of Salt.
 *
 * Provides the protected public report gateway (`/api/grain-of-salt/report`):
 * 1. Method & Origin validation + CORS preflight
 * 2. Strict 8 KiB body ceiling
 * 3. Emergency shutdown kill switches (`DISABLE_SUBMISSIONS`, `DISABLE_AI_TRIAGE`, `DISABLE_AI_REPAIR`)
 * 4. Server-side Turnstile verification
 * 5. Schema validation & sanitization (`validateReportPayload`)
 * 6. Privacy-safe source hashing (`computeSourceHash`)
 * 7. Atomic rate limiting & content fingerprint deduplication
 * 8. Multi-stage triage & repair boundary evaluation
 */

import {
    MAX_RAW_BODY_BYTES,
    computeReportFingerprint,
    validateReportPayload
} from "../../../src/utils/bugReportValidator.js"
import {
    computeSourceHash,
    createMemoryGatewayStore
} from "./rateLimiter.js"
import { runTriagePipeline } from "./triagePipeline.js"

const defaultStore = createMemoryGatewayStore()

function parseBooleanFlag(value, defaultValue = false) {
    if(typeof value === "boolean")
        return value
    if(typeof value !== "string")
        return defaultValue
    const normalized = value.trim().toLowerCase()
    if(normalized === "true" || normalized === "1" || normalized === "yes")
        return true
    if(normalized === "false" || normalized === "0" || normalized === "no")
        return false
    return defaultValue
}

function getCorsHeaders(origin, allowedOriginsStr = "https://lovro-music.de,http://localhost:5173,http://127.0.0.1:4173") {
    const allowedList = String(allowedOriginsStr || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)

    const matchedOrigin = origin && allowedList.includes(origin) ? origin : allowedList[0] || "https://lovro-music.de"

    return {
        "Access-Control-Allow-Origin": matchedOrigin,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
        "Access-Control-Max-Age": "86400",
        "Vary": "Origin",
        "X-Content-Type-Options": "nosniff"
    }
}

function jsonResponse(body, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            ...extraHeaders
        }
    })
}

/**
 * Verifies a Cloudflare Turnstile token server-side when TURNSTILE_SECRET_KEY is configured.
 */
export async function verifyTurnstileToken({ token, secretKey, remoteIp, verifyImpl }) {
    if(!secretKey) {
        return { success: true, skipped: true }
    }

    if(!token || typeof token !== "string" || token.trim().length === 0) {
        return { success: false, errorCode: "missing_turnstile_token" }
    }

    if(typeof verifyImpl === "function") {
        return verifyImpl({ token, secretKey, remoteIp })
    }

    try {
        const formData = new URLSearchParams()
        formData.set("secret", secretKey)
        formData.set("response", token.trim())
        if(remoteIp) {
            formData.set("remoteip", remoteIp)
        }

        const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formData.toString()
        })

        const outcome = await res.json()
        return {
            success: Boolean(outcome?.success),
            errorCode: outcome?.success ? undefined : "invalid_turnstile_token"
        }
    }
    catch (_error) {
        return {
            success: false,
            errorCode: "turnstile_verification_failed"
        }
    }
}

/**
 * Core request handler supporting dependency injection for unit/integration testing.
 *
 * @param {Request} request
 * @param {Object} env
 * @param {Object} deps
 * @return {Promise<Response>}
 */
export async function handleReportRequest(request, env = {}, deps = {}) {
    const origin = request.headers.get("Origin") || ""
    const corsHeaders = getCorsHeaders(origin, env.ALLOWED_ORIGINS)
    const now = typeof deps.now === "function" ? deps.now() : Date.now()
    const store = deps.store || defaultStore

    if(request.method === "OPTIONS") {
        return new Response(null, { status: 204, headers: corsHeaders })
    }

    if(request.method !== "POST") {
        return jsonResponse({ ok: false, errorCode: "method_not_allowed" }, 405, corsHeaders)
    }

    const allowedOrigins = String(env.ALLOWED_ORIGINS || "https://lovro-music.de,http://localhost:5173,http://127.0.0.1:4173")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)

    if(origin && !allowedOrigins.includes(origin)) {
        return jsonResponse({ ok: false, errorCode: "forbidden_origin" }, 403, corsHeaders)
    }

    if(parseBooleanFlag(env.DISABLE_SUBMISSIONS, false)) {
        return jsonResponse(
            { ok: false, errorCode: "submissions_disabled", message: "Automated reporting is temporarily paused." },
            503,
            corsHeaders
        )
    }

    const contentLengthHeader = Number(request.headers.get("Content-Length") || 0)
    if(contentLengthHeader > MAX_RAW_BODY_BYTES) {
        return jsonResponse({ ok: false, errorCode: "payload_too_large" }, 413, corsHeaders)
    }

    let rawBody = ""
    try {
        rawBody = await request.text()
    }
    catch (_error) {
        return jsonResponse({ ok: false, errorCode: "invalid_body" }, 400, corsHeaders)
    }

    const rawBytes = new TextEncoder().encode(rawBody).length
    if(rawBytes > MAX_RAW_BODY_BYTES) {
        return jsonResponse({ ok: false, errorCode: "payload_too_large" }, 413, corsHeaders)
    }

    let parsedPayload = null
    try {
        parsedPayload = JSON.parse(rawBody)
    }
    catch (_error) {
        return jsonResponse({ ok: false, errorCode: "malformed_json" }, 400, corsHeaders)
    }

    const validation = validateReportPayload(parsedPayload, { rawByteLength: rawBytes })
    if(!validation.valid) {
        return jsonResponse(
            { ok: false, errorCode: validation.errorCode || "validation_failed" },
            400,
            corsHeaders
        )
    }

    if(validation.isBotHoneypot) {
        return jsonResponse(
            { ok: true, reportId: "GOS-ACK", duplicate: false },
            202,
            corsHeaders
        )
    }

    const clientIp = request.headers.get("CF-Connecting-IP") || request.headers.get("X-Forwarded-For") || "0.0.0.0"
    const userAgent = request.headers.get("User-Agent") || ""

    const turnstileCheck = await verifyTurnstileToken({
        token: validation.sanitized.turnstileToken,
        secretKey: env.TURNSTILE_SECRET_KEY,
        remoteIp: clientIp,
        verifyImpl: deps.verifyTurnstile
    })

    if(!turnstileCheck.success) {
        return jsonResponse(
            { ok: false, errorCode: turnstileCheck.errorCode || "challenge_failed" },
            403,
            corsHeaders
        )
    }

    const sourceHash = await computeSourceHash(
        clientIp,
        userAgent,
        env.SOURCE_HASH_SALT || "gos-default-salt"
    )

    const rateLimitConfig = {
        perSourceHourly: Number(env.MAX_SOURCE_HOURLY_REPORTS || 3),
        perSourceDaily: Number(env.MAX_SOURCE_DAILY_REPORTS || 8),
        globalDaily: Number(env.MAX_DAILY_GLOBAL_REPORTS || 60),
        dailyAiTriageJobs: Number(env.MAX_DAILY_AI_TRIAGE_JOBS || 20),
        dailyRepairAttempts: Number(env.MAX_DAILY_REPAIR_ATTEMPTS || 3)
    }

    const quota = await store.checkAndConsumeSubmissionQuota(sourceHash, rateLimitConfig, now)
    if(!quota.allowed) {
        return jsonResponse(
            { ok: false, errorCode: "rate_limited", reason: quota.reason },
            429,
            corsHeaders
        )
    }

    const fingerprint = computeReportFingerprint(validation.sanitized)
    const reportId = `GOS-${fingerprint.slice(0, 8).toUpperCase()}`

    const upsertResult = await store.upsertReport({
        reportId,
        fingerprint,
        ...validation.sanitized,
        sourceHash
    }, now)

    if(upsertResult.duplicate) {
        return jsonResponse(
            {
                ok: true,
                reportId: upsertResult.report.reportId,
                duplicate: true,
                duplicateCount: upsertResult.report.duplicateCount,
                classification: upsertResult.report.classification
            },
            200,
            corsHeaders
        )
    }

    const triage = await runTriagePipeline(validation.sanitized, {
        disableAiTriage: parseBooleanFlag(env.DISABLE_AI_TRIAGE, false),
        disableAiRepair: parseBooleanFlag(env.DISABLE_AI_REPAIR, false),
        consumeTriageBudget: () => store.checkAndConsumeBudget("triage", rateLimitConfig, now),
        aiClassifier: deps.aiClassifier
    })

    await store.updateReportTriage(reportId, {
        status: triage.classification === "spam_or_abuse" ? "rejected_abuse" : "triaged",
        classification: triage.classification,
        triage
    }, now)

    return jsonResponse(
        {
            ok: true,
            reportId,
            duplicate: false,
            classification: triage.classification,
            stage: triage.stage
        },
        202,
        corsHeaders
    )
}

export default {
    async fetch(request, env) {
        return handleReportRequest(request, env)
    }
}
