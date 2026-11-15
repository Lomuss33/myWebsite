/**
 * @description Shared schema validation, deterministic relevance evaluation, deduplication fingerprinting,
 * and diagnostic context sanitization for Project Directive: The Grain of Salt.
 * Runs identically in browser (pre-check & UX guidance) and Cloudflare Worker (authoritative enforcement).
 */

export const BUG_REPORT_SCHEMA_VERSION = 1
export const MAX_RAW_BODY_BYTES = 8192

export const DEFAULT_REPORT_LIMITS = Object.freeze({
    maxBodyBytes: MAX_RAW_BODY_BYTES,
    maxSummaryLength: 160,
    maxDescriptionLength: 2000,
    maxStepsLength: 600,
    maxExpectedBehaviorLength: 400,
    maxReplyEmailLength: 160,
    maxLinks: 2,
    minDescriptionLength: 10
})

export const ALLOWED_REPORT_TYPES = Object.freeze([
    "bug_report",
    "feedback"
])

export const ALLOWED_SECTIONS = Object.freeze([
    "about",
    "skills",
    "experience",
    "education",
    "portfolio",
    "my-software",
    "my-hardware",
    "my-writings",
    "my-art",
    "achievements",
    "updates",
    "contact",
    "navigation",
    "other",
    "general"
])

export const ALLOWED_REPRODUCIBILITY = Object.freeze([
    "always",
    "sometimes",
    "once",
    "unsure"
])

const LOW_QUALITY_EXACT_PHRASES = new Set([
    "bad website",
    "fix everything",
    "your site sucks",
    "make it like instagram",
    "delete your content",
    "test",
    "testing",
    "hello",
    "hi",
    "asdf",
    "qwerty",
    "schlechte webseite",
    "alles kaputt",
    "loša stranica",
    "kötü site"
])

const VAGUE_BUG_PATTERNS = [
    /^(?:the\s+)?(?:button|link|page|menu|form|site|it)\s+(?:does(?:n't|\s+not)\s+work|is\s+broken|is\s+not\s+working)\.?$/i,
    /^(?:der\s+|die\s+|das\s+)?(?:button|knopf|link|seite|menü|formular|es)\s+(?:funktioniert\s+nicht|geht\s+nicht|ist\s+kaputt)\.?$/i,
    /^(?:gumb|tipka|link|stranica|izbornik|forma|ovo)\s+(?:ne\s+radi|je\s+pokvareno)\.?$/i,
    /^(?:buton|düğme|bağlantı|sayfa|menü|form|bu)\s+(?:çalışmıyor|bozuk)\.?$/i
]

const PROMPT_INJECTION_PATTERNS = [
    /ignore\s+(?:all\s+|your\s+)?(?:previous|prior|above|system)\s+instructions/i,
    /disregard\s+(?:all\s+|your\s+)?(?:previous|prior|system)\s+instructions/i,
    /replace\s+the\s+deployment\s+script/i,
    /print\s+(?:all\s+|your\s+|process\.env|environment)/i,
    /dump\s+(?:all\s+|your\s+)?(?:secrets|env|tokens|keys)/i,
    /delete\s+all\s+(?:javascript|js|source|repository)\s+files/i,
    /\.github\/workflows/i,
    /GITHUB_TOKEN|TURNSTILE_SECRET|OPENAI_API_KEY|ANTHROPIC_API_KEY/i,
    /system\s*prompt/i,
    /you\s+are\s+now\s+an?\s+unrestricted/i
]

const ADVERTISING_SPAM_PATTERNS = [
    /\b(?:buy\s+cheap|casino|viagra|crypto\s+airdrop|seo\s+backlinks|telegram\s+pump)\b/i
]

const SUBJECTIVE_COMPLAINT_PATTERNS = [
    /\b(?:i\s+hate\s+this|ugly\s+font|worst\s+portfolio|ugly\s+color|ugly\s+design|make\s+it\s+like\s+instagram)\b/i
]

const TECHNICAL_SYMPTOM_PATTERNS = [
    /\b(?:broken|bug|error|stuck|crash|freeze|freezes|frozen|disappear|disappears|missing|overlap|overlaps|scroll|scrolling|click|clicking|tap|tapping|button|dropdown|modal|gallery|cursor|theme|language|mobile|desktop|iphone|android|safari|firefox|chrome|layout|overflow|clip|clipped|clips|covered|focus|blank|loading)\b/i,
    /\b(?:fehler|kaputt|hängt|friert|verschwindet|fehlt|überlappt|scrollen|klicken|tippen|knopf|galerie|sprache|handy|mobil|darstellung|leer|lädt)\b/i,
    /\b(?:greška|kvar|ne\s+radi|zapinje|smrzava|nestaje|nedostaje|preklapa|skrolanje|klik|dodir|gumb|galerija|jezik|mobitel|prikaz|prazno|učitava)\b/i,
    /\b(?:hata|bozuk|çalışmıyor|takılıyor|donuyor|kayboluyor|eksik|üst\s+üste|kaydırma|tıklama|dokunma|buton|galeri|dil|mobil|görünüm|boş|yükleniyor)\b/i
]

export function countUrls(text) {
    if(!text || typeof text !== "string")
        return 0
    const matches = text.match(/(?:https?:\/\/|www\.)[^\s<>"{}|\\^`[\]]+/gi)
    return matches ? matches.length : 0
}

export function stripControlChars(value) {
    const str = String(value || "")
    let out = ""
    for(let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i)
        if(code === 9 || code === 10 || code === 13 || (code >= 32 && code !== 127)) {
            out += str[i]
        }
    }
    return out
}

export function sanitizeText(value, maxLength = 2000) {
    if(typeof value !== "string")
        return ""
    return stripControlChars(value)
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim()
        .slice(0, maxLength)
}

export function containsSuspiciousHtmlOrScript(text) {
    if(typeof text !== "string" || !text)
        return false
    return /<\s*(?:script|iframe|object|embed|svg|img|style|link|meta)\b|javascript\s*:|on(?:error|load|click|mouseover)\s*=/i.test(text)
}

export function detectPromptInjection(text) {
    if(typeof text !== "string" || !text)
        return false
    return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(text))
}

export function isExcessivelyRepetitive(text) {
    if(typeof text !== "string")
        return true
    const normalized = text.trim().toLowerCase()
    if(!normalized)
        return true

    if(/(.)\1{17,}/u.test(normalized))
        return true

    const words = normalized.split(/\s+/).filter(Boolean)
    if(words.length >= 6) {
        const uniqueWords = new Set(words)
        if(uniqueWords.size / words.length < 0.25)
            return true
    }

    if(normalized.length >= 20) {
        const nonSpaceChars = normalized.replace(/\s+/g, "")
        const uniqueChars = new Set(nonSpaceChars)
        if(uniqueChars.size <= 3)
            return true
    }

    return false
}

/**
 * Deterministic UX helper: evaluates whether a visitor's bug description is weak/vague
 * or low-quality, without calling any AI model.
 */
export function evaluateDescriptionQuality(description, details = {}) {
    const trimmed = String(description || "").trim()
    if(!trimmed) {
        return {
            isWeak: false,
            status: "empty",
            reason: "empty"
        }
    }

    const normalized = trimmed.toLowerCase().replace(/[.!?]+$/g, "").trim()
    if(LOW_QUALITY_EXACT_PHRASES.has(normalized)) {
        return {
            isWeak: true,
            status: "low_quality",
            reason: "vague_or_missing_context"
        }
    }

    const words = trimmed.split(/\s+/).filter(Boolean)
    const hasExtraDetails = Boolean(
        (details && typeof details === "object" && (details.steps || details.expectedBehavior))
    )

    const isVaguePattern = VAGUE_BUG_PATTERNS.some((pattern) => pattern.test(trimmed))
    const hasTechnicalCue = TECHNICAL_SYMPTOM_PATTERNS.some((pattern) => pattern.test(trimmed))

    if(isVaguePattern || (words.length < 6 && !hasExtraDetails) || (!hasTechnicalCue && words.length < 8 && !hasExtraDetails)) {
        return {
            isWeak: true,
            status: "needs_detail",
            reason: "vague_or_missing_context"
        }
    }

    return {
        isWeak: false,
        status: "ok",
        reason: null
    }
}

/**
 * Computes a stable, normalized content fingerprint for deduplication.
 */
export function computeReportFingerprint(payload = {}) {
    const type = String(payload.type || payload.kind || "bug_report").toLowerCase().trim()
    const section = String(payload.affectedSection || payload.diagnostics?.section || "contact").toLowerCase().trim()
    const normalizeText = (value) =>
        String(value || "")
            .toLowerCase()
            .normalize("NFKC")
            .replace(/[^\p{L}\p{N}\s]/gu, " ")
            .replace(/\s+/g, " ")
            .trim()

    const coreText = [
        normalizeText(payload.description),
        normalizeText(payload.steps || payload.reproductionSteps),
        normalizeText(payload.expectedBehavior)
    ]
        .filter(Boolean)
        .join(" | ")

    const canonical = `${type}:${section}:${coreText}`

    let h1 = 0x811c9dc5
    let h2 = 0x811c9dc5 ^ 0x9e3779b9
    for(let i = 0; i < canonical.length; i++) {
        const code = canonical.charCodeAt(i)
        h1 ^= code
        h1 = Math.imul(h1, 0x01000193)
        h2 ^= code ^ (i & 0xff)
        h2 = Math.imul(h2, 0x01000193)
    }

    const hex1 = (h1 >>> 0).toString(16).padStart(8, "0")
    const hex2 = (h2 >>> 0).toString(16).padStart(8, "0")
    return `${hex1}${hex2}`
}

/**
 * Sanitizes diagnostics so only safe, whitelisted fields are retained and query strings are stripped.
 */
export function sanitizeDiagnostics(rawDiagnostics = {}) {
    if(!rawDiagnostics || typeof rawDiagnostics !== "object" || Array.isArray(rawDiagnostics)) {
        return {
            routeHash: "",
            section: "contact",
            language: "en",
            theme: "dark",
            viewportWidth: 0,
            viewportHeight: 0,
            devicePixelRatio: 1,
            layoutMode: "normal",
            cursorMode: "magic",
            touchCapable: false,
            reducedMotion: false,
            source: "complaint-form"
        }
    }

    const rawHash = typeof rawDiagnostics.routeHash === "string" ?
        rawDiagnostics.routeHash :
        typeof rawDiagnostics.hash === "string" ?
            rawDiagnostics.hash :
            ""
    const cleanHash = rawHash.split("?")[0].replace(/[^#a-zA-Z0-9:_-]/g, "").slice(0, 64)

    const rawSection = String(rawDiagnostics.section || "contact").trim().toLowerCase()
    const cleanSection = ALLOWED_SECTIONS.includes(rawSection) ? rawSection : "contact"

    const rawLang = String(rawDiagnostics.language || "en").trim().toLowerCase()
    const cleanLang = ["en", "de", "hr", "tr"].includes(rawLang) ? rawLang : "en"

    const rawTheme = String(rawDiagnostics.theme || "dark").trim().toLowerCase()
    const cleanTheme = ["dark", "light"].includes(rawTheme) ? rawTheme : "dark"

    const viewportWidth = Math.max(0, Math.min(10000, Math.round(Number(rawDiagnostics.viewportWidth) || 0)))
    const viewportHeight = Math.max(0, Math.min(10000, Math.round(Number(rawDiagnostics.viewportHeight) || 0)))
    const devicePixelRatio = Math.max(0.5, Math.min(8, Number(rawDiagnostics.devicePixelRatio) || 1))

    const rawLayout = String(rawDiagnostics.layoutMode || "normal").trim().toLowerCase()
    const cleanLayout = ["mobile", "normal", "ultrawide"].includes(rawLayout) ? rawLayout : "normal"

    const rawCursor = String(rawDiagnostics.cursorMode || "magic").trim().toLowerCase()
    const cleanCursor = ["magic", "medieval", "system", "off"].includes(rawCursor) ? rawCursor : "magic"

    const rawSource = String(rawDiagnostics.source || "complaint-form").trim().toLowerCase()
    const cleanSource = rawSource === "salt-shaker" ? "salt-shaker" : "complaint-form"

    return {
        routeHash: cleanHash,
        section: cleanSection,
        language: cleanLang,
        theme: cleanTheme,
        viewportWidth,
        viewportHeight,
        devicePixelRatio,
        layoutMode: cleanLayout,
        cursorMode: cleanCursor,
        touchCapable: Boolean(rawDiagnostics.touchCapable),
        reducedMotion: Boolean(rawDiagnostics.reducedMotion),
        source: cleanSource
    }
}

/**
 * Collects privacy-respecting diagnostic context in the browser without fingerprinting,
 * cookies, tokens, or URL query parameters.
 */
export function collectBrowserDiagnostics(overrides = {}) {
    if(typeof window === "undefined") {
        return sanitizeDiagnostics(overrides)
    }

    const hash = window.location?.hash ? window.location.hash.split("?")[0] : ""
    const htmlEl = typeof document !== "undefined" ? document.documentElement : null
    const layoutAttr = htmlEl?.getAttribute("data-layout") || overrides.layoutMode || "normal"
    const themeAttr = htmlEl?.getAttribute("data-theme") || overrides.theme || "dark"

    return sanitizeDiagnostics({
        routeHash: overrides.routeHash ?? hash,
        section: overrides.section || hash.replace(/^#/, "") || "contact",
        language: overrides.language || "en",
        theme: themeAttr,
        viewportWidth: overrides.viewportWidth ?? (window.innerWidth || 0),
        viewportHeight: overrides.viewportHeight ?? (window.innerHeight || 0),
        devicePixelRatio: overrides.devicePixelRatio ?? (window.devicePixelRatio || 1),
        layoutMode: layoutAttr,
        cursorMode: overrides.cursorMode || "magic",
        touchCapable: overrides.touchCapable ?? (Number(window.navigator?.maxTouchPoints) > 0),
        reducedMotion: overrides.reducedMotion ?? Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches),
        source: overrides.source || "complaint-form"
    })
}

/**
 * Validates and sanitizes the versioned report request payload.
 * Enforces strict schema, byte ceiling, field lengths, link limits, honeypot, and email validation.
 */
export function validateReportPayload(rawPayload, options = {}) {
    const rawByteLength = Number(options.rawByteLength || 0)
    if(rawByteLength > MAX_RAW_BODY_BYTES) {
        return {
            valid: false,
            errorCode: "payload_too_large"
        }
    }

    if(!rawPayload || typeof rawPayload !== "object" || Array.isArray(rawPayload)) {
        return {
            valid: false,
            errorCode: "invalid_payload"
        }
    }

    const serializedSize = new TextEncoder().encode(JSON.stringify(rawPayload)).length
    if(serializedSize > MAX_RAW_BODY_BYTES) {
        return {
            valid: false,
            errorCode: "payload_too_large"
        }
    }

    const honeypot = String(rawPayload.honeypot || "").trim()
    const type = ALLOWED_REPORT_TYPES.includes(rawPayload.type) ?
        rawPayload.type :
        ALLOWED_REPORT_TYPES.includes(rawPayload.kind) ?
            rawPayload.kind :
            "bug_report"

    const description = sanitizeText(rawPayload.description, DEFAULT_REPORT_LIMITS.maxDescriptionLength + 1)
    if(!description) {
        return {
            valid: false,
            errorCode: "empty_description"
        }
    }

    if(description.length < DEFAULT_REPORT_LIMITS.minDescriptionLength) {
        return {
            valid: false,
            errorCode: "description_too_short"
        }
    }

    if(description.length > DEFAULT_REPORT_LIMITS.maxDescriptionLength) {
        return {
            valid: false,
            errorCode: "description_too_long"
        }
    }

    const steps = sanitizeText(rawPayload.steps || rawPayload.reproductionSteps || "", DEFAULT_REPORT_LIMITS.maxStepsLength)
    const expectedBehavior = sanitizeText(rawPayload.expectedBehavior || "", DEFAULT_REPORT_LIMITS.maxExpectedBehaviorLength)
    const replyEmail = sanitizeText(rawPayload.replyEmail || "", DEFAULT_REPORT_LIMITS.maxReplyEmailLength)

    if(replyEmail) {
        const emailValid = /^[^\s@<>()[\]\\.,;:@"]+(\.[^\s@<>()[\]\\.,;:@"]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(replyEmail)
        if(!emailValid) {
            return {
                valid: false,
                errorCode: "invalid_email"
            }
        }
    }

    const combinedText = [description, steps, expectedBehavior].filter(Boolean).join("\n")
    if(
        countUrls(combinedText) > DEFAULT_REPORT_LIMITS.maxLinks ||
        isExcessivelyRepetitive(description) ||
        ADVERTISING_SPAM_PATTERNS.some((pattern) => pattern.test(combinedText))
    ) {
        return {
            valid: false,
            errorCode: "spam_content"
        }
    }

    const rawSection = String(rawPayload.affectedSection || "").trim().toLowerCase()
    const affectedSection = ALLOWED_SECTIONS.includes(rawSection) ? rawSection : ""

    const rawRepro = String(rawPayload.reproducibility || "unsure").trim().toLowerCase()
    const reproducibility = ALLOWED_REPRODUCIBILITY.includes(rawRepro) ? rawRepro : "unsure"

    const turnstileToken = sanitizeText(rawPayload.turnstileToken || "", 2048)
    const diagnostics = sanitizeDiagnostics(rawPayload.diagnostics)

    const sanitized = {
        version: BUG_REPORT_SCHEMA_VERSION,
        type,
        description,
        affectedSection: affectedSection || diagnostics.section || "contact",
        reproducibility,
        steps,
        expectedBehavior,
        replyEmail,
        turnstileToken,
        diagnostics
    }

    return {
        valid: true,
        isBotHoneypot: honeypot.length > 0,
        sanitized
    }
}

/**
 * Stage 2 deterministic relevance and safety evaluator.
 * Separates prompt-injection/abuse, subjective complaints, missing info, and actionable bug reports
 * BEFORE any AI triage job is considered.
 */
export function classifyReportRelevance(sanitizedReport = {}) {
    const combinedText = [
        sanitizedReport.description,
        sanitizedReport.steps,
        sanitizedReport.expectedBehavior
    ]
        .filter(Boolean)
        .join("\n")

    if(detectPromptInjection(combinedText) || containsSuspiciousHtmlOrScript(combinedText)) {
        return {
            classification: "spam_or_abuse",
            confidence: 0.99,
            shouldInvokeAi: false,
            reason: "prompt_injection_or_abuse_detected"
        }
    }

    if(ADVERTISING_SPAM_PATTERNS.some((pattern) => pattern.test(combinedText))) {
        return {
            classification: "spam_or_abuse",
            confidence: 0.95,
            shouldInvokeAi: false,
            reason: "advertising_spam_detected"
        }
    }

    const normalizedDesc = String(sanitizedReport.description || "").toLowerCase().replace(/[.!?]+$/g, "").trim()
    if(LOW_QUALITY_EXACT_PHRASES.has(normalizedDesc)) {
        return {
            classification: "joke_or_non_actionable",
            confidence: 0.9,
            shouldInvokeAi: false,
            reason: "low_signal_phrase"
        }
    }

    if(SUBJECTIVE_COMPLAINT_PATTERNS.some((pattern) => pattern.test(combinedText))) {
        return {
            classification: "subjective_complaint",
            confidence: 0.85,
            shouldInvokeAi: false,
            reason: "subjective_opinion_or_style_preference"
        }
    }

    if(sanitizedReport.type === "feedback" && !TECHNICAL_SYMPTOM_PATTERNS.some((pattern) => pattern.test(combinedText))) {
        return {
            classification: "valid_feedback",
            confidence: 0.8,
            shouldInvokeAi: false,
            reason: "general_feedback"
        }
    }

    const hasTechnicalSymptom = TECHNICAL_SYMPTOM_PATTERNS.some((pattern) => pattern.test(combinedText))
    const wordCount = String(sanitizedReport.description || "").trim().split(/\s+/).filter(Boolean).length
    const hasStepsOrExpected = Boolean(sanitizedReport.steps || sanitizedReport.expectedBehavior)

    if(!hasTechnicalSymptom && wordCount < 8 && !hasStepsOrExpected) {
        return {
            classification: "needs_more_info",
            confidence: 0.75,
            shouldInvokeAi: false,
            reason: "insufficient_technical_detail"
        }
    }

    return {
        classification: "actionable_bug",
        confidence: 0.88,
        shouldInvokeAi: true,
        reason: "technical_symptom_and_context_present"
    }
}
