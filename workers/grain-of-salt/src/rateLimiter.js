/**
 * @description Shared durable state store & rate-limiting / budget / deduplication engine
 * for Project Directive: The Grain of Salt.
 *
 * Works against Cloudflare D1 (SQLite) in production and provides a deterministic,
 * atomic in-memory adapter for unit/integration tests and local development.
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
 * Computes a privacy-safe salted hash of an IP + User-Agent + time window so raw IPs
 * are never stored in the database or forwarded to external services.
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
 * Creates a concurrency-safe shared state store for rate limits, budgets, and reports.
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
        /**
         * Atomically checks and consumes submission rate-limit quotas.
         */
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

        /**
         * Atomically checks and consumes daily AI triage / repair budgets.
         */
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

        /**
         * Stores or deduplicates a validated report by content fingerprint.
         */
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
