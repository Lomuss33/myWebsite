/**
 * @description Bounded Coding Agent & Triage Artifact Generator for Project Directive: The Grain of Salt.
 *
 * Executed by `.github/workflows/grain-of-salt-triage.yml` (or locally during integration tests).
 * Responsibilities:
 * 1. Validate the incoming dispatch payload and enforce the `DISABLE_AI_REPAIR` kill switch.
 * 2. Enforce `evaluateRepairProposal` and `evaluateRepairFilePath` (`repairPolicy.js`) before and after any file write.
 * 3. When an AI API key (`AI_API_KEY`) is configured and `ENABLE_BOUNDED_AI_PATCH="true"`, optionally request a
 *    strictly bounded patch for candidate files within `ALLOWED_REPAIR_PATH_PATTERNS`.
 * 4. Write a human-reviewable triage dossier under `docs/reports/grain-of-salt/<reportId>.md` (an allowed `docs/` path)
 *    and output branch/PR metadata for the GitHub Actions Draft PR step.
 * 5. Never push to `main` or auto-merge; every change requires human PR review.
 */

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
    REQUIRED_VALIDATION_GATES,
    evaluateRepairFilePath,
    evaluateRepairProposal
} from "../workers/grain-of-salt/src/repairPolicy.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const REPO_ROOT = path.resolve(__dirname, "..")

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

function sanitizeReportId(rawId) {
    const cleaned = String(rawId || "GOS-MANUAL")
        .trim()
        .replace(/[^A-Za-z0-9_-]/g, "")
        .slice(0, 32)
    return cleaned || "GOS-MANUAL"
}

/**
 * Generates the Markdown dossier for a triaged actionable bug report.
 *
 * @param {Object} payload
 * @param {string[]} appliedFiles
 * @return {string}
 */
export function buildTriageDossierMarkdown(payload, appliedFiles = []) {
    const reportId = sanitizeReportId(payload.reportId)
    const section = String(payload.affectedSection || "contact").trim()
    const reproducibility = String(payload.reproducibility || "unsure").trim()
    const classification = String(payload.classification || "actionable_bug").trim()
    const confidence = Number(payload.confidence ?? 0.8).toFixed(2)
    const summary = String(payload.summary || payload.description || "").trim()
    const description = String(payload.description || "").trim()
    const steps = String(payload.steps || "").trim()
    const expectedBehavior = String(payload.expectedBehavior || "").trim()
    const candidateFiles = Array.isArray(payload.candidateFiles) ? payload.candidateFiles : []
    const diagnostics = payload.diagnostics && typeof payload.diagnostics === "object" ? payload.diagnostics : {}

    const lines = [
        `# Grain of Salt Triage Dossier — \`${reportId}\``,
        "",
        "| Field | Value |",
        "| :--- | :--- |",
        `| **Report ID** | \`${reportId}\` |`,
        `| **Classification** | \`${classification}\` (confidence \`${confidence}\`) |`,
        `| **Affected Section** | \`${section}\` |`,
        `| **Reproducibility** | \`${reproducibility}\` |`,
        `| **Requires Human Review** | \`true\` (Draft PR only — never auto-merged) |`,
        "",
        "## Visitor Report",
        "",
        "### Summary",
        summary || "_No summary provided._",
        "",
        "### Description",
        description || "_No description provided._",
        ""
    ]

    if(steps) {
        lines.push("### Steps to Reproduce", steps, "")
    }

    if(expectedBehavior) {
        lines.push("### Expected vs. Actual Behavior", expectedBehavior, "")
    }

    lines.push(
        "## Diagnostics Snapshot",
        "",
        "```json",
        JSON.stringify(diagnostics, null, 2),
        "```",
        "",
        "## Candidate Files & Repair Boundary Check",
        ""
    )

    if(candidateFiles.length > 0) {
        for(const candidate of candidateFiles) {
            const check = evaluateRepairFilePath(candidate)
            lines.push(`- \`${candidate}\` — ${check.allowed ? "ALLOWED" : `BLOCKED (${check.reason})`}`)
        }
    }
    else {
        lines.push("- _No candidate files supplied._")
    }

    lines.push("", "## Modified Files in This Branch", "")
    if(appliedFiles.length > 0) {
        for(const file of appliedFiles) {
            lines.push(`- \`${file}\``)
        }
    }
    else {
        lines.push("- _Triage dossier only (bounded AI code patching not enabled or no safe patch produced)._")
    }

    lines.push(
        "",
        "## Required Validation Gates Before Merge",
        "",
        ...REQUIRED_VALIDATION_GATES.map((gate) => `- [ ] \`${gate}\``),
        ""
    )

    return lines.join("\n")
}

/**
 * Optionally requests a bounded file replacement from an OpenAI-compatible model when
 * `env.AI_API_KEY` and `env.ENABLE_BOUNDED_AI_PATCH === "true"` are set.
 */
export async function requestBoundedAiPatches(payload, candidateFiles, env = {}, fetchImpl = fetch, repoRoot = REPO_ROOT) {
    const apiKey = String(env.AI_API_KEY || "").trim()
    const enablePatch = parseBooleanFlag(env.ENABLE_BOUNDED_AI_PATCH, false)
    if(!apiKey || !enablePatch) {
        return { applied: false, reason: "ai_patch_disabled_or_unconfigured", edits: [] }
    }

    const readableFiles = []
    for(const relPath of candidateFiles.slice(0, 3)) {
        const pathCheck = evaluateRepairFilePath(relPath)
        if(!pathCheck.allowed) {
            throw new Error(`Refusing to read protected path: ${relPath} (${pathCheck.reason})`)
        }
        const absPath = path.resolve(repoRoot, relPath)
        if(fs.existsSync(absPath) && fs.statSync(absPath).isFile()) {
            const content = fs.readFileSync(absPath, "utf8")
            if(content.length <= 24000) {
                readableFiles.push({ path: relPath, content })
            }
        }
    }

    if(readableFiles.length === 0) {
        return { applied: false, reason: "no_readable_candidate_files", edits: [] }
    }

    const endpoint = String(env.AI_API_URL || "https://api.openai.com/v1/chat/completions").trim()
    const model = String(env.AI_MODEL || "gpt-4o-mini").trim()

    const systemPrompt = [
        "You are a bounded frontend maintenance agent for a React + Vite portfolio.",
        "Given a visitor bug report and up to 3 candidate source files, propose a minimal, safe fix ONLY if the root cause is clear and unambiguous.",
        "Return strict JSON only: {\"edits\": [{\"path\": \"relative/path\", \"search\": \"exact existing snippet\", \"replace\": \"replacement snippet\"}], \"rationale\": \"short explanation\"}.",
        "If the report does not clearly map to a safe code change in the provided files, return {\"edits\": [], \"rationale\": \"insufficient certainty\"}."
    ].join(" ")

    const response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model,
            temperature: 0,
            max_tokens: 1200,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: JSON.stringify({
                        report: {
                            reportId: payload.reportId,
                            affectedSection: payload.affectedSection,
                            description: payload.description,
                            steps: payload.steps,
                            expectedBehavior: payload.expectedBehavior
                        },
                        files: readableFiles
                    })
                }
            ]
        })
    })

    if(!response.ok) {
        return { applied: false, reason: `ai_http_${response.status}`, edits: [] }
    }

    const data = await response.json()
    const rawContent = data?.choices?.[0]?.message?.content || "{}"
    const parsed = JSON.parse(rawContent)
    const edits = Array.isArray(parsed?.edits) ? parsed.edits : []

    return {
        applied: edits.length > 0,
        reason: parsed?.rationale || "ok",
        edits
    }
}

/**
 * Executes the bounded triage & repair agent against a dispatch payload.
 *
 * @param {Object} payload
 * @param {Object} options
 * @return {Promise<{ permitted: boolean, reason?: string, reportId: string, branchName: string, dossierPath: string, modifiedFiles: string[] }>}
 */
export async function executeBoundedRepairAgent(payload = {}, options = {}) {
    const env = options.env || process.env
    const repoRoot = options.repoRoot || REPO_ROOT
    const writeDossier = options.writeDossier !== false
    const disableAiRepair = parseBooleanFlag(env.DISABLE_AI_REPAIR, false)

    const reportId = sanitizeReportId(payload.reportId)
    const candidateFiles = Array.isArray(payload.candidateFiles) && payload.candidateFiles.length > 0 ?
        payload.candidateFiles :
        [`docs/reports/grain-of-salt/${reportId}.md`]

    const proposalEvaluation = evaluateRepairProposal(
        {
            classification: payload.classification || "actionable_bug",
            files: candidateFiles,
            autoMerge: Boolean(payload.autoMerge),
            targetBranch: payload.targetBranch || `grain-of-salt/fix-${reportId.toLowerCase()}`,
            directPush: Boolean(payload.directPush)
        },
        { disableAiRepair }
    )

    if(!proposalEvaluation.permitted) {
        return {
            permitted: false,
            reason: proposalEvaluation.reason,
            reportId,
            branchName: `grain-of-salt/fix-${reportId.toLowerCase()}`,
            dossierPath: "",
            modifiedFiles: []
        }
    }

    const modifiedFiles = []
    const aiPatchOutcome = await requestBoundedAiPatches(
        payload,
        candidateFiles,
        env,
        options.fetchImpl || fetch,
        repoRoot
    )

    if(aiPatchOutcome.applied && Array.isArray(aiPatchOutcome.edits)) {
        for(const edit of aiPatchOutcome.edits) {
            const relPath = String(edit?.path || "").trim().replaceAll("\\", "/")
            const filePolicy = evaluateRepairFilePath(relPath)
            if(!filePolicy.allowed) {
                throw new Error(`Protected file policy violation in AI edit: ${relPath} (${filePolicy.reason})`)
            }

            const absTarget = path.resolve(repoRoot, relPath)
            if(!absTarget.startsWith(path.resolve(repoRoot))) {
                throw new Error(`Path traversal attempt blocked: ${relPath}`)
            }

            if(fs.existsSync(absTarget) && typeof edit.search === "string" && edit.search.length > 0 && typeof edit.replace === "string") {
                const currentContent = fs.readFileSync(absTarget, "utf8")
                if(currentContent.includes(edit.search)) {
                    const updatedContent = currentContent.replace(edit.search, edit.replace)
                    if(updatedContent !== currentContent) {
                        fs.writeFileSync(absTarget, updatedContent, "utf8")
                        modifiedFiles.push(relPath)
                    }
                }
            }
        }
    }

    const dossierRelPath = `docs/reports/grain-of-salt/${reportId}.md`
    const dossierPolicy = evaluateRepairFilePath(dossierRelPath)
    if(!dossierPolicy.allowed) {
        throw new Error(`Dossier path rejected by repair policy: ${dossierRelPath}`)
    }

    if(writeDossier) {
        const dossierAbsPath = path.resolve(repoRoot, dossierRelPath)
        fs.mkdirSync(path.dirname(dossierAbsPath), { recursive: true })
        const markdown = buildTriageDossierMarkdown(payload, [...modifiedFiles, dossierRelPath])
        fs.writeFileSync(dossierAbsPath, markdown, "utf8")
        modifiedFiles.push(dossierRelPath)
    }

    return {
        permitted: true,
        reportId,
        branchName: `grain-of-salt/fix-${reportId.toLowerCase()}`,
        dossierPath: dossierRelPath,
        modifiedFiles,
        validationGates: proposalEvaluation.validationGates
    }
}

async function main() {
    const rawPayload = process.env.GRAIN_OF_SALT_PAYLOAD || process.argv[2] || "{}"
    let payload = {}
    try {
        payload = JSON.parse(rawPayload)
    }
    catch (error) {
        console.error("[grain-of-salt-agent] Invalid JSON payload:", error.message)
        process.exit(1)
    }

    const result = await executeBoundedRepairAgent(payload)
    if(!result.permitted) {
        console.error(`[grain-of-salt-agent] Repair proposal rejected by policy: ${result.reason}`)
        process.exit(2)
    }

    console.log(JSON.stringify(result, null, 2))
}

if(process.argv[1] && path.resolve(process.argv[1]) === __filename) {
    main().catch((error) => {
        console.error("[grain-of-salt-agent] Fatal error:", error)
        process.exit(1)
    })
}
