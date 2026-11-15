/**
 * @description Shared durable state store & rate-limiting / budget / deduplication engine
 * for Project Directive: The Grain of Salt.
 *
 * Provides:
 * 1. `createD1GatewayStore(d1Database)` — production adapter backed by Cloudflare D1 (`env.DB`)
 *    using atomic conditional `INSERT ... ON CONFLICT DO UPDATE ... WHERE counter < ?` SQL statements
 *    so concurrent requests across Worker isolates cannot bypass rate limits or daily cost budgets.
 * 2. `createMemoryGatewayStore()` — deterministic in-memory adapter with an explicit mutex lock chain
 *    for local Node.js unit/integration tests when `ALLOW_IN_MEMORY_FALLBACK="true"`.
 * 3. `resolveGatewayStore(env, deps)` — resolves `deps.store`, `env.DB` (via `createD1GatewayStore`),
 *    or throws/rejects unless `ALLOW_IN_MEMORY_FALLBACK="true"` is explicitly enabled.
 */

export const DEFAULT_RATE_LIMITS = {
    perSourceHourly: 3,
    perSourceDaily: 8,
    globalHourly: 25,
    globalDaily: 60,
    dailyAiTriageJobs: 20,
    dailyRepairAttempts: 3,
    duplicateWindowMs: 24 * 60 * 60 * 1000
}

/**
 * Computes a privacy-safe salted hash of an IP + User-Agent so raw IPs
 * are never stored in D1 or forwarded to external services.
 *
 * @param {string} ip
 * @param {string} userAgent
 * @param {string} salt
 * @return {Promise<string>}
 */
export async function computeSourceHash(ip = "0.0.0.0", userAgent = "", salt = "default-gos-salt") {
    const normalizedIp = String(ip || "0.0.0.0").trim().toLowerCase()
    const normalizedUa = String(userAgent || "").trim().slice(0, 160)
    const raw = `${salt}|${normalizedIp}|${normalizedUa}`

    if(typeof crypto !== "undefined" && crypto.subtle) {
        const encoded = new TextEncoder().encode(raw)
        const digest = await crypto.subtle.digest("SHA-256", encoded)
        return Array.from(new Uint8Array(digest))
            .slice(0, 16)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
    }

    let h1 = 0xdeadbeef ^ raw.length
    let h2 = 0x41c6ce57 ^ raw.length
    for(let i = 0; i < raw.length; i++) {
        const ch = raw.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
    return `${(h1 >>> 0).toString(16).padStart(8, "0")}${(h2 >>> 0).toString(16).padStart(8, "0")}`
}

/**
 * Production Cloudflare D1 adapter (`env.DB`).
 * Uses atomic SQL conditional upserts (`WHERE rate_limits.expires_at <= ? OR rate_limits.counter < ?`)
 * so concurrent requests cannot race past per-source, global, or AI budget ceilings.
 *
 * @param {Object} db Cloudflare D1 binding (`env.DB`)
 */
export function createD1GatewayStore(db) {
    if(!db || typeof db.prepare !== "function") {
        throw new Error("Invalid Cloudflare D1 database binding passed to createD1GatewayStore")
    }

    const CONSUME_BUCKET_SQL = `
        INSERT INTO rate_limits (bucket_key, counter, window_start, expires_at)
        VALUES (?1, 1, ?2, ?3)
        ON CONFLICT(bucket_key) DO UPDATE SET
            counter = CASE
                WHEN rate_limits.expires_at <= ?2 THEN 1
                ELSE rate_limits.counter + 1
            END,
            window_start = CASE
                WHEN rate_limits.expires_at <= ?2 THEN ?2
                ELSE rate_limits.window_start
            END,
            expires_at = CASE
                WHEN rate_limits.expires_at <= ?2 THEN ?3
                ELSE rate_limits.expires_at
            END
        WHERE rate_limits.expires_at <= ?2 OR rate_limits.counter < ?4
    `

    async function tryIncrementBucket(bucketKey, windowMs, ceiling, now) {
        const expiresAt = now + windowMs
        const result = await db
            .prepare(CONSUME_BUCKET_SQL)
            .bind(bucketKey, now, expiresAt, ceiling)
            .run()

        const changes = Number(result?.meta?.changes ?? result?.changes ?? 0)
        if(changes < 1) {
            return { allowed: false, used: ceiling }
        }

        const row = await db
            .prepare("SELECT counter FROM rate_limits WHERE bucket_key = ?1")
            .bind(bucketKey)
            .first()

        return {
            allowed: true,
            used: Number(row?.counter || 1)
        }
    }

    async function decrementBucket(bucketKey) {
        await db
            .prepare("UPDATE rate_limits SET counter = MAX(0, counter - 1) WHERE bucket_key = ?1")
            .bind(bucketKey)
            .run()
    }

    return {
        backend: "d1",

        async checkAndConsumeSubmissionQuota(sourceHash, config = {}, now = Date.now()) {
            const limits = { ...DEFAULT_RATE_LIMITS, ...config }
            const hourBucket = Math.floor(now / 3600000)
            const dayBucket = Math.floor(now / 86400000)

            const checks = [
                { key: `src:hr:${sourceHash}:${hourBucket}`, windowMs: 3600000, ceiling: limits.perSourceHourly, reason: "source_hourly_limit_exceeded" },
                { key: `src:day:${sourceHash}:${dayBucket}`, windowMs: 86400000, ceiling: limits.perSourceDaily, reason: "source_daily_limit_exceeded" },
                { key: `glb:hr:${hourBucket}`, windowMs: 3600000, ceiling: limits.globalHourly, reason: "global_hourly_limit_exceeded" },
                { key: `glb:day:${dayBucket}`, windowMs: 86400000, ceiling: limits.globalDaily, reason: "global_daily_limit_exceeded" }
            ]

            const incrementedKeys = []
            const counts = {}

            for(const item of checks) {
                const res = await tryIncrementBucket(item.key, item.windowMs, item.ceiling, now)
                if(!res.allowed) {
                    for(const prevKey of incrementedKeys) {
                        await decrementBucket(prevKey)
                    }
                    return {
                        allowed: false,
                        reason: item.reason
                    }
                }
                incrementedKeys.push(item.key)
                counts[item.key] = res.used
            }

            return {
                allowed: true,
                remainingHourly: Math.max(0, limits.perSourceHourly - (counts[checks[0].key] || 1)),
                remainingDaily: Math.max(0, limits.perSourceDaily - (counts[checks[1].key] || 1))
            }
        },

        async checkAndConsumeBudget(budgetType = "triage", config = {}, now = Date.now()) {
            const limits = { ...DEFAULT_RATE_LIMITS, ...config }
            const dayBucket = Math.floor(now / 86400000)
            const key = `budget:${budgetType}:${dayBucket}`
            const ceiling = budgetType === "repair" ?
                limits.dailyRepairAttempts :
                limits.dailyAiTriageJobs

            const res = await tryIncrementBucket(key, 86400000, ceiling, now)
            if(!res.allowed) {
                return {
                    allowed: false,
                    reason: `${budgetType}_daily_budget_exhausted`,
                    used: ceiling,
                    ceiling
                }
            }

            return {
                allowed: true,
                used: res.used,
                ceiling,
                remaining: Math.max(0, ceiling - res.used)
            }
        },

        async upsertReport(reportRecord, now = Date.now()) {
            const windowCutoff = now - DEFAULT_RATE_LIMITS.duplicateWindowMs
            const dupUpdate = await db
                .prepare(`
                    UPDATE reports
                    SET duplicate_count = duplicate_count + 1,
                        updated_at = ?2
                    WHERE fingerprint = ?1 AND created_at >= ?3
                `)
                .bind(reportRecord.fingerprint, now, windowCutoff)
                .run()

            const dupChanges = Number(dupUpdate?.meta?.changes ?? dupUpdate?.changes ?? 0)
            if(dupChanges > 0) {
                const existing = await db
                    .prepare("SELECT * FROM reports WHERE fingerprint = ?1")
                    .bind(reportRecord.fingerprint)
                    .first()

                return {
                    duplicate: true,
                    report: normalizeD1ReportRow(existing)
                }
            }

            await db
                .prepare(`
                    INSERT INTO reports (
                        report_id, fingerprint, report_type, status, classification,
                        affected_section, reproducibility, description, steps,
                        expected_behavior, reply_email, diagnostics_json, triage_json,
                        duplicate_count, source_hash, created_at, updated_at
                    ) VALUES (
                        ?1, ?2, ?3, ?4, ?5,
                        ?6, ?7, ?8, ?9,
                        ?10, ?11, ?12, ?13,
                        1, ?14, ?15, ?15
                    )
                    ON CONFLICT(fingerprint) DO UPDATE SET
                        duplicate_count = reports.duplicate_count + 1,
                        updated_at = ?15
                `)
                .bind(
                    reportRecord.reportId,
                    reportRecord.fingerprint,
                    reportRecord.type || "bug_report",
                    reportRecord.status || "accepted",
                    reportRecord.classification || "pending",
                    reportRecord.affectedSection || "",
                    reportRecord.reproducibility || "unsure",
                    reportRecord.description,
                    reportRecord.steps || "",
                    reportRecord.expectedBehavior || "",
                    reportRecord.replyEmail || "",
                    JSON.stringify(reportRecord.diagnostics || {}),
                    JSON.stringify(reportRecord.triage || {}),
                    reportRecord.sourceHash || "",
                    now
                )
                .run()

            const stored = await db
                .prepare("SELECT * FROM reports WHERE fingerprint = ?1")
                .bind(reportRecord.fingerprint)
                .first()

            const normalized = normalizeD1ReportRow(stored)
            return {
                duplicate: normalized.duplicateCount > 1,
                report: normalized
            }
        },

        async updateReportTriage(reportId, triageUpdate = {}, now = Date.now()) {
            const existing = await db
                .prepare("SELECT * FROM reports WHERE report_id = ?1")
                .bind(reportId)
                .first()

            if(!existing)
                return null

            const nextStatus = triageUpdate.status || existing.status
            const nextClassification = triageUpdate.classification || existing.classification
            const nextTriageJson = triageUpdate.triage ?
                JSON.stringify(triageUpdate.triage) :
                existing.triage_json

            await db
                .prepare(`
                    UPDATE reports
                    SET status = ?2,
                        classification = ?3,
                        triage_json = ?4,
                        updated_at = ?5
                    WHERE report_id = ?1
                `)
                .bind(reportId, nextStatus, nextClassification, nextTriageJson, now)
                .run()

            const updated = await db
                .prepare("SELECT * FROM reports WHERE report_id = ?1")
                .bind(reportId)
                .first()

            return normalizeD1ReportRow(updated)
        },

        async getReportById(reportId) {
            const row = await db
                .prepare("SELECT * FROM reports WHERE report_id = ?1")
                .bind(reportId)
                .first()

            return row ? normalizeD1ReportRow(row) : null
        }
    }
}

function normalizeD1ReportRow(row) {
    if(!row)
        return null

    let diagnostics = {}
    let triage = null
    try {
        diagnostics = row.diagnostics_json ? JSON.parse(row.diagnostics_json) : {}
    }
    catch (_e) {
        diagnostics = {}
    }
    try {
        triage = row.triage_json ? JSON.parse(row.triage_json) : null
    }
    catch (_e) {
        triage = null
    }

    return {
        reportId: row.report_id,
        fingerprint: row.fingerprint,
        type: row.report_type,
        status: row.status,
        classification: row.classification,
        affectedSection: row.affected_section,
        reproducibility: row.reproducibility,
        description: row.description,
        steps: row.steps,
        expectedBehavior: row.expected_behavior,
        replyEmail: row.reply_email,
        diagnostics,
        triage,
        duplicateCount: Number(row.duplicate_count || 1),
        sourceHash: row.source_hash,
        createdAt: Number(row.created_at || 0),
        updatedAt: Number(row.updated_at || 0)
    }
}

/**
 * Resolves the active gateway store:
 * - Uses `deps.store` if injected (unit tests)
 * - Uses `createD1GatewayStore(env.DB)` if Cloudflare D1 binding `env.DB` is present
 * - Otherwise requires explicit `env.ALLOW_IN_MEMORY_FALLBACK === "true"`
 */
export function resolveGatewayStore(env = {}, deps = {}, fallbackMemoryStore = null) {
    if(deps.store) {
        return { ok: true, store: deps.store }
    }

    if(env.DB && typeof env.DB.prepare === "function") {
        return { ok: true, store: createD1GatewayStore(env.DB) }
    }

    const allowMemory = String(env.ALLOW_IN_MEMORY_FALLBACK || "").trim().toLowerCase() === "true"
    if(allowMemory && fallbackMemoryStore) {
        return { ok: true, store: fallbackMemoryStore }
    }

    return {
        ok: false,
        errorCode: "durable_storage_unconfigured"
    }
}

/**
 * Creates a concurrency-safe in-memory state store for local unit/integration testing.
 */
export function createMemoryGatewayStore() {
    const buckets = new Map()
    const reportsByFingerprint = new Map()
    const reportsById = new Map()
    let lockChain = Promise.resolve()

    function withAtomicLock(fn) {
        const next = lockChain.then(fn, fn)
        lockChain = next.then(() => undefined, () => undefined)
        return next
    }

    function pruneExpired(now) {
        for(const [key, entry] of buckets.entries()) {
            if(entry.expiresAt <= now) {
                buckets.delete(key)
            }
        }
    }

    function readCounter(key, now) {
        const entry = buckets.get(key)
        if(!entry || entry.expiresAt <= now)
            return 0
        return entry.counter
    }

    function incrementCounter(key, windowMs, now) {
        const existing = buckets.get(key)
        if(!existing || existing.expiresAt <= now) {
            const created = {
                counter: 1,
                windowStart: now,
                expiresAt: now + windowMs
            }
            buckets.set(key, created)
            return created.counter
        }

        existing.counter += 1
        return existing.counter
    }

    return {
        backend: "memory",

        async checkAndConsumeSubmissionQuota(sourceHash, config = {}, now = Date.now()) {
            return withAtomicLock(async () => {
                pruneExpired(now)

                const limits = { ...DEFAULT_RATE_LIMITS, ...config }
                const hourBucket = Math.floor(now / 3600000)
                const dayBucket = Math.floor(now / 86400000)

                const sourceHourKey = `src:hr:${sourceHash}:${hourBucket}`
                const sourceDayKey = `src:day:${sourceHash}:${dayBucket}`
                const globalHourKey = `glb:hr:${hourBucket}`
                const globalDayKey = `glb:day:${dayBucket}`

                if(readCounter(sourceHourKey, now) >= limits.perSourceHourly) {
                    return { allowed: false, reason: "source_hourly_limit_exceeded" }
                }
                if(readCounter(sourceDayKey, now) >= limits.perSourceDaily) {
                    return { allowed: false, reason: "source_daily_limit_exceeded" }
                }
                if(readCounter(globalHourKey, now) >= limits.globalHourly) {
                    return { allowed: false, reason: "global_hourly_limit_exceeded" }
                }
                if(readCounter(globalDayKey, now) >= limits.globalDaily) {
                    return { allowed: false, reason: "global_daily_limit_exceeded" }
                }

                incrementCounter(sourceHourKey, 3600000, now)
                incrementCounter(sourceDayKey, 86400000, now)
                incrementCounter(globalHourKey, 3600000, now)
                incrementCounter(globalDayKey, 86400000, now)

                return {
                    allowed: true,
                    remainingHourly: limits.perSourceHourly - readCounter(sourceHourKey, now),
                    remainingDaily: limits.perSourceDaily - readCounter(sourceDayKey, now)
                }
            })
        },

        async checkAndConsumeBudget(budgetType = "triage", config = {}, now = Date.now()) {
            return withAtomicLock(async () => {
                pruneExpired(now)
                const limits = { ...DEFAULT_RATE_LIMITS, ...config }
                const dayBucket = Math.floor(now / 86400000)
                const key = `budget:${budgetType}:${dayBucket}`
                const ceiling = budgetType === "repair" ?
                    limits.dailyRepairAttempts :
                    limits.dailyAiTriageJobs

                if(readCounter(key, now) >= ceiling) {
                    return {
                        allowed: false,
                        reason: `${budgetType}_daily_budget_exhausted`,
                        used: readCounter(key, now),
                        ceiling
                    }
                }

                const used = incrementCounter(key, 86400000, now)
                return {
                    allowed: true,
                    used,
                    ceiling,
                    remaining: ceiling - used
                }
            })
        },

        async upsertReport(reportRecord, now = Date.now()) {
            return withAtomicLock(async () => {
                const existing = reportsByFingerprint.get(reportRecord.fingerprint)
                if(existing && now - existing.createdAt <= DEFAULT_RATE_LIMITS.duplicateWindowMs) {
                    existing.duplicateCount += 1
                    existing.updatedAt = now
                    return {
                        duplicate: true,
                        report: { ...existing }
                    }
                }

                const created = {
                    reportId: reportRecord.reportId,
                    fingerprint: reportRecord.fingerprint,
                    type: reportRecord.type || "bug_report",
                    status: reportRecord.status || "accepted",
                    classification: reportRecord.classification || "pending",
                    affectedSection: reportRecord.affectedSection || "",
                    reproducibility: reportRecord.reproducibility || "unsure",
                    description: reportRecord.description,
                    steps: reportRecord.steps || "",
                    expectedBehavior: reportRecord.expectedBehavior || "",
                    replyEmail: reportRecord.replyEmail || "",
                    diagnostics: reportRecord.diagnostics || {},
                    triage: reportRecord.triage || null,
                    duplicateCount: 1,
                    sourceHash: reportRecord.sourceHash || "",
                    createdAt: now,
                    updatedAt: now
                }

                reportsByFingerprint.set(created.fingerprint, created)
                reportsById.set(created.reportId, created)

                return {
                    duplicate: false,
                    report: { ...created }
                }
            })
        },

        async updateReportTriage(reportId, triageUpdate = {}, now = Date.now()) {
            return withAtomicLock(async () => {
                const existing = reportsById.get(reportId)
                if(!existing)
                    return null

                if(triageUpdate.status) existing.status = triageUpdate.status
                if(triageUpdate.classification) existing.classification = triageUpdate.classification
                if(triageUpdate.triage) existing.triage = triageUpdate.triage
                existing.updatedAt = now
                return { ...existing }
            })
        },

        async getReportById(reportId) {
            const record = reportsById.get(reportId)
            return record ? { ...record } : null
        }
    }
}
