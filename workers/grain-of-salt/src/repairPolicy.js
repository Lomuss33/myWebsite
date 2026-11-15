/**
 * @description Stage 4 Repair Boundary & Protected File Policy for Project Directive: The Grain of Salt.
 *
 * Ensures that untrusted visitor bug reports can NEVER trigger modifications to workflows,
 * secrets, deployment configuration, billing, authentication, or security guardrails,
 * and can never auto-merge changes to the live branch.
 */

export const PROTECTED_PATH_PATTERNS = [
    /^\.github\/workflows\//i,
    /^\.github\/CODEOWNERS$/i,
    /^\.github\/dependabot/i,
    /^workers\//i,
    /wrangler\.toml/i,
    /^\.env/i,
    /^package-lock\.json$/i,
    /^npm\/validate-/i,
    /secret|credential|token|billing|auth/i
]

export const ALLOWED_REPAIR_PATH_PATTERNS = [
    /^src\/components\//,
    /^src\/styles\//,
    /^src\/providers\//,
    /^src\/hooks\//,
    /^src\/utils\//,
    /^public\/data\//,
    /^tests\//,
    /^docs\//
]

export const REQUIRED_VALIDATION_GATES = [
    "npm run validate:i18n",
    "npm run lint",
    "npm run test:layout",
    "npm run test:grain-of-salt",
    "npm run build",
    "npm run test:responsive:ci"
]

/**
 * Checks whether a repository file path is permitted to be touched by an automated repair proposal.
 *
 * @param {string} filePath
 * @return {{ allowed: boolean, reason?: string }}
 */
export function evaluateRepairFilePath(filePath) {
    const normalized = String(filePath || "")
        .trim()
        .replaceAll("\\", "/")
        .replace(/^\/+/, "")

    if(!normalized || normalized.includes("..")) {
        return {
            allowed: false,
            reason: "invalid_or_traversal_path"
        }
    }

    for(const pattern of PROTECTED_PATH_PATTERNS) {
        if(pattern.test(normalized)) {
            return {
                allowed: false,
                reason: "protected_file_denylist"
            }
        }
    }

    const isAllowed = ALLOWED_REPAIR_PATH_PATTERNS.some((pattern) => pattern.test(normalized))
    if(!isAllowed) {
        return {
            allowed: false,
            reason: "outside_allowed_repair_scope"
        }
    }

    return {
        allowed: true
    }
}

/**
 * Validates a proposed repair plan before any branch or PR creation is permitted.
 *
 * @param {Object} proposal
 * @param {Object} policyOptions
 * @return {{ permitted: boolean, reason?: string, requiresHumanApproval: boolean, validationGates: string[] }}
 */
export function evaluateRepairProposal(proposal = {}, policyOptions = {}) {
    if(policyOptions.disableAiRepair) {
        return {
            permitted: false,
            reason: "ai_repair_disabled_by_kill_switch",
            requiresHumanApproval: true,
            validationGates: REQUIRED_VALIDATION_GATES
        }
    }

    if(proposal.autoMerge === true || proposal.targetBranch === "main" && proposal.directPush === true) {
        return {
            permitted: false,
            reason: "direct_push_or_auto_merge_forbidden",
            requiresHumanApproval: true,
            validationGates: REQUIRED_VALIDATION_GATES
        }
    }

    if(!proposal.classification || proposal.classification !== "actionable_bug") {
        return {
            permitted: false,
            reason: "non_actionable_classification",
            requiresHumanApproval: true,
            validationGates: REQUIRED_VALIDATION_GATES
        }
    }

    const candidateFiles = Array.isArray(proposal.files) ? proposal.files : []
    if(candidateFiles.length === 0) {
        return {
            permitted: false,
            reason: "no_target_files_specified",
            requiresHumanApproval: true,
            validationGates: REQUIRED_VALIDATION_GATES
        }
    }

    if(candidateFiles.length > 6) {
        return {
            permitted: false,
            reason: "repair_diff_scope_too_wide",
            requiresHumanApproval: true,
            validationGates: REQUIRED_VALIDATION_GATES
        }
    }

    for(const filePath of candidateFiles) {
        const check = evaluateRepairFilePath(filePath)
        if(!check.allowed) {
            return {
                permitted: false,
                reason: `${check.reason}:${filePath}`,
                requiresHumanApproval: true,
                validationGates: REQUIRED_VALIDATION_GATES
            }
        }
    }

    return {
        permitted: true,
        requiresHumanApproval: true,
        validationGates: REQUIRED_VALIDATION_GATES
    }
}
