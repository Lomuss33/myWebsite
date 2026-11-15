# The Grain of Salt: Bug Reporting, Triage & Protected Repair Pipeline

Verified: 2026-11-15 against `LayoutSaltShaker.jsx`, `NavigationProvider.jsx`, `ArticleComplaintForm.jsx`, `bugReportValidator.js`, `workers/grain-of-salt/`, `npm/grain-of-salt.test.js`, and `tests/grain-of-salt.spec.js`.

## Purpose

"Take it with a grain of salt" connects the bottom-right salt-shaker badge to the Contact section's complaint box (`#article-4-section-contact`) so visitors can report website defects or submit complaints from anywhere on the site while preserving the desktop cursor-mode easter egg (`Magic` <-> `Medieval`) and all existing playful complaint destinations.

## Owners

| Responsibility | Owner |
|---|---|
| Salt-shaker badge, cursor toggle & report entry trigger | [LayoutSaltShaker.jsx](../../src/components/layout/LayoutSaltShaker.jsx) |
| Lifecycle-aware section + article arrival coordination | [NavigationProvider.jsx](../../src/providers/NavigationProvider.jsx), [Section.jsx](../../src/components/sections/Section.jsx) |
| Complaint box UI, progressive bug-report mode & scroll arrival | [ArticleComplaintForm.jsx](../../src/components/articles/ArticleComplaintForm.jsx), [ArticleComplaintForm.scss](../../src/components/articles/ArticleComplaintForm.scss) |
| Shared schema validation, deterministic quality hints, fingerprinting & privacy-safe diagnostics | [bugReportValidator.js](../../src/utils/bugReportValidator.js), [api.js](../../src/hooks/api.js) |
| Localized copy (`en`, `de`, `hr`, `tr`) | [contact.json](../../public/data/sections/contact.json), [strings.json](../../public/data/strings.json), [ArticleDataWrapper.js](../../src/hooks/models/ArticleDataWrapper.js) |
| Protected serverless gateway, rate limiter, D1 schema & triage/repair boundary | [index.js](../../workers/grain-of-salt/src/index.js), [rateLimiter.js](../../workers/grain-of-salt/src/rateLimiter.js), [triagePipeline.js](../../workers/grain-of-salt/src/triagePipeline.js), [repairPolicy.js](../../workers/grain-of-salt/src/repairPolicy.js), [schema.sql](../../workers/grain-of-salt/schema.sql) |
| Unit & E2E verification | [grain-of-salt.test.js](../../npm/grain-of-salt.test.js), [grain-of-salt.spec.js](../../tests/grain-of-salt.spec.js) |

## Frontend Behavior Contract

1. **Salt Shaker Entry (`LayoutSaltShaker.jsx`)**:
   - On desktop with custom cursor active, clicking the salt shaker toggles the cursor mode (`magic` <-> `medieval`) and displays the localized cursor notification, **and** calls `navigation.requestArticleNavigation("contact", "article-4-section-contact", { source: "salt-shaker", mode: "report" })`.
   - On mobile/touch or when custom cursor is disabled, tapping the salt shaker navigates directly to `#contact` and targets `#article-4-section-contact`.
2. **Lifecycle-Synchronized Scroll & Focus (`ArticleComplaintForm.jsx`)**:
   - Never uses arbitrary fixed `setTimeout` delays for arrival scrolling.
   - Waits until `#section-contact.section-shown` contains `.section-content-page-ready` and no `.section-loading-placeholder` (via `MutationObserver` + `requestAnimationFrame`).
   - Switches the destination to `bug_report` ("Report a website bug") without clearing any draft message the visitor has already typed.
   - Scrolls `#article-4-section-contact` into view inside `#scrollable-contact` on desktop or `window` on mobile, then focuses `#complaint-form-textarea` with `focus({ preventScroll: true })`.
3. **Preserved Destinations & Desktop Density**:
   - All four original destinations (`nowhere`, `you_where`, `knjiga_zalbi`, `anzeige_raus`) remain intact.
   - The progressive bug-report drawer renders outside `.article-complaint-form-main` and only when `bug_report` mode or salt-shaker arrival is active, preserving the default `#contact` desktop density contract (`.article-complaint-form-main` height `< 250px`).

## Serverless Gateway, Security & Cost Guardrails

The public frontend remains a static GitHub Pages build (`https://lovro-music.de`) with zero embedded secrets. Public report intake is handled by the isolated Cloudflare Worker in [workers/grain-of-salt/src/index.js](../../workers/grain-of-salt/src/index.js) with graceful EmailJS fallback when the Worker route is not yet bound:

- **Strict Payload & Abuse Controls**:
  - `POST` only, Origin allowlist check, `8 KiB` maximum body size, strict JSON schema validation, honeypot field check, max 2 URLs, no file uploads, and server-side Cloudflare Turnstile verification (`TURNSTILE_SECRET_KEY`).
- **Privacy-Safe Source Hashing**:
  - Client IP and User-Agent are hashed with `SOURCE_HASH_SALT` (`computeSourceHash`) into a short anonymized token; raw IP addresses are never stored or forwarded.
- **Durable Rate Limiting, Deduplication & Hard Budgets**:
  - Per-source limits (`3/hour`, `8/day`), global ceilings (`25/hour`, `60/day`), and content fingerprinting (`computeReportFingerprint`) that coalesces duplicate reports before any AI call.
  - Hard daily ceilings on AI triage jobs (`MAX_DAILY_AI_TRIAGE_JOBS`, default `20`) and repair attempts (`MAX_DAILY_REPAIR_ATTEMPTS`, default `3`).
- **Prompt-Injection Isolation & Protected File Denylist**:
  - Stage 2 (`classifyReportRelevance`) deterministically blocks prompt-injection strings (`ignore previous instructions`, `system prompt`, `.github/workflows`, token dumps) before any AI model is called.
  - Stage 3 (`buildIsolatedTriagePrompt` + `validateStructuredTriageOutput`) wraps visitor text in an untrusted JSON data envelope and validates output against a strict enum schema.
  - Stage 4 (`evaluateRepairFilePath` + `evaluateRepairProposal` in [repairPolicy.js](../../workers/grain-of-salt/src/repairPolicy.js)) forbids touching `.github/workflows/**`, `.github/CODEOWNERS`, `workers/**`, `wrangler.toml`, `.env*`, `package-lock.json`, or `npm/validate-*`, and forbids auto-merging or direct pushes to `main`.

## Emergency Kill Switches & Maintenance

Set any of the following environment variables in Cloudflare Worker settings (see [wrangler.toml.example](../../workers/grain-of-salt/wrangler.toml.example)) to pause stages immediately without redeploying the static site:

- `DISABLE_SUBMISSIONS = "true"` — returns HTTP `503` at the gateway edge.
- `DISABLE_AI_TRIAGE = "true"` — runs only deterministic Stage 2 classification (zero AI token cost).
- `DISABLE_AI_REPAIR = "true"` — blocks all Stage 4 repair proposals.
- `DISABLE_GITHUB_ISSUES = "true"` / `DISABLE_GITHUB_PRS = "true"` — disables downstream GitHub artifact creation.
