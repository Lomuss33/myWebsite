# Simple feature documentation improvements

Status: complete (five-feature pilot). Updated: 2026-10-06. Historical implementation record; current guidance lives in the [feature index](../README.md#find-a-feature) and [small feature workflow](../guides/feature-documentation.md).

Objective: find a feature using ordinary user wording, locate its source quickly, and preserve accepted behavior without maintaining a second specification of the application. The small pilot below is implemented; expansion beyond it is optional future work.

## Small changes, in order

| Step | Change | Practical value |
|---|---|---|
| 1 | Add a compact feature table to [docs/README.md](../README.md): ordinary name, a few aliases, one sentence describing its purpose, and the owner/topic link. Start with the frequently edited interactions, not every component. | Requests such as "that edge thing" or "drag rail" can be matched by purpose and aliases, without knowing a component name. |
| 2 | Use one small feature-page template: purpose, accepted rules, owner files, confirmed issues, and 3–5 relevant verification steps. Include a Verified date and its actual scope. | The agent can understand what to preserve and where to work from one short read. |
| 3 | Put a small dependency table only where ownership is spread across files: behavior, styles, content, layout authority, and mounting/lifecycle. Link to existing guidance for shared rules. | Prevents changing a symptom in the wrong layer or overlooking a selector/content dependency. |
| 4 | Condense the long Home and responsive-layout histories gradually. Keep current rules and owner links; move superseded explanations into the archive only after checking source and preserving useful decisions. | Current pages become faster to scan without losing accepted design constraints. |
| 5 | Add a lightweight check for missing local links and owner paths. Update the relevant contract, aliases and verification scope in the same change as behavior. | Broken pointers are caught automatically; maintenance happens during the work rather than as a separate cleanup project. |

## Pilot

Use the existing [startup guide](../architecture/startup-guide.md) as the first example. Next cover the drag interactions, decorative bands and project stickers, using their owning source and existing Home/responsive guidance. Start with five useful feature entries; expand when an actual task exposes missing guidance.

Give each feature a stable ID, while keeping names and aliases flexible. Add useful new phrases encountered in user requests; do not attempt to list every typo. A description and neighboring feature names allow an agent to narrow a search even when the exact phrase is absent.

Keep accepted rules distinct from confirmed bugs and unapproved ideas. For example: "visible until interaction" is a rule; a misplaced label is an issue; an optional help control is a proposal. Avoid a second "current behavior" section that merely repeats the contract when no discrepancy exists.

## Maintenance rule

The existing [AGENTS.md](../../AGENTS.md) and [maintainer workflow](../../MAINTANER.md) already require updating canonical guidance when behavior changes. Make that update small: revise the affected rule, source link or check, rather than rewriting the whole page. The user should not have to remember internal names or perform documentation upkeep.

Automation can detect missing links; it cannot reliably decide whether prose still matches intent. Do not generate contracts blindly from code or stamp an entire page as verified after checking one paragraph. No new documentation framework, search service or mandatory approval step is needed.

## Done when

- An agent can find the five pilot features from ordinary descriptions and reach their owners with one topic read and at most two focused searches.
- Each rule has one canonical home; indexes and shared pages link to it.
- Old plans cannot be mistaken for current specifications, and known issues are visibly separate from proposed improvements.
- Changed feature guidance has valid paths and a truthful verification scope.

Completed: five alias/purpose entries, short contracts and owner/dependency tables, a reusable template, extraction of repeated drag/sticker/renderer paragraphs from Home/responsive guidance, and `npm run validate:docs` in CI. The current-document scan and focused historical-record scan passed; counts/scope are reported by the command. No application upgrade, deployment or documentation framework was introduced.

Future upkeep: evaluate discovery during actual tasks and add entries only when needed. The link checker catches missing paths; maintainers/agents still reconcile accepted intent and code in the same change. This pilot does not promise exhaustive aliases, anchor validation or automatic prose verification.
