# Project maintenance and upgrade roadmap

- Status: active
- Objective: keep the site secure, deployable, responsive, and maintainable while upgrading dependencies in reviewable steps.
- Scope: CI/runtime, dependency refreshes, browser coverage, and measured performance work. No broad rewrite is approved by this plan.
- Owner: repository maintainer
- Last updated: 2026-09-30

## Verified baseline

- The maintenance pass updated the workflow to Node 24, added pull-request verification, and made deployment depend on successful checks.
- The lockfile audit reports zero vulnerabilities. Sass is declared and locked at 1.105.1. A separate clean worktree installed that version and passed the production build and complete Chromium suite; the original preview remains on its already-running local Sass 1.100.0 install.
- Lint, responsive layout tests, production build, workflow YAML parsing, lockfile dry-run, and clean `npm ci` passed. The Chromium responsive suite passed 79/79 twice against the original install and once against the clean locked install.
- Weekly npm and GitHub Actions update PRs are configured in `.github/dependabot.yml`, with development-tool patch updates grouped and major changes kept separate.
- The browser workflow now uses a focused Chromium CI suite and a smaller Firefox/WebKit interaction smoke set. Its six section-fit samples collectively cover all four locales, both themes, and mobile, normal, and ultrawide layouts; the exhaustive 24-case matrix and detailed specs remain available through `npm run test:responsive`. Fractional hairline widths and subpixel animation offsets are asserted with tolerances rather than exact serialization. Hosted-runner results for the simplified gates remain unverified until the workflow runs.
- React 19.3.0, React DOM 19.3.0, and matching React type packages pass a clean install and local compatibility matrix: lint, layout and Minesweeper tests, production build, all 79 Chromium tests, and the 11-test responsive smoke group in Chromium, Firefox, and WebKit. `npm audit --audit-level=high` found zero vulnerabilities. The main workspace manifest, lockfile, and installed dependency tree now all resolve React 19.
- Vite 8.3.1 and `@vitejs/plugin-react` 6.1.1 pass a clean install, audit, lint, focused unit tests, production build, and the current full 79-test Chromium suite. The current production snapshot also passes the 11-test CI-focused responsive interaction group in Chromium, Firefox, and WebKit (11/11 in each). The build config uses Rolldown's `rolldownOptions.output.codeSplitting` groups, and an explicit target preserves the Vite 6 `modules` floor (ES2020, Edge 88, Firefox 78, Chrome 87, Safari 14). The only build warning is the Three.js chunk at about 609 KB raw / 154 KB gzip. A cold WebKit run against Vite's development server exceeded Playwright's former 15-second section-readiness wait while lazy modules loaded; the wait now allows 30 seconds. The same case passes against the production preview. Hosted CI remains unverified.
- A first bounded maintainability extraction moved the Minesweeper board, flood-reveal, and win rules out of the 5,800-line `ArticleWebArt.jsx` into `webArt/minesweeper.js`. Four focused Node tests cover generated clues, safe mine limits, flood expansion/flags, and win states; the tested rules are included in CI.
- The build still reports a 602 KB raw Three.js chunk (about 154 KB compressed). It is a separate visual-effects chunk; measure route-level impact before changing loading behavior.
- Major releases are available across several dependencies. No blanket major upgrade was attempted because runtime, plugin, and component compatibility must be checked as a set.

## Order of work

### 1. Confirm the checked-in baseline in CI

Fresh-worktree verification passed locally on Node 24 with a clean `npm ci`, locked Sass 1.105.1, lint, layout tests, all 79 Playwright tests, and the production build. The routine workflow now runs focused Chromium coverage plus a small Firefox/WebKit interaction smoke set; the exhaustive local suite remains available for broad changes and diagnosis. Confirm the hosted GitHub runner passes the simplified gates. Resolve any Linux-only or hosted-runner issues before starting dependency majors. Keep deployment gated to successful verification.

**Done when:** the PR workflow is green from a fresh runner and the build uses the exact lockfile versions.

### 2. Add a low-risk dependency update routine

Dependabot now checks npm and GitHub Actions updates weekly and groups compatible development-tool patch updates; major updates remain separate. Review patch and minor updates in small batches, with security updates first. Every update PR must run audit, lint, layout tests, browser tests, and build.

**Done when:** updates arrive as reviewable PRs with CI evidence and no unreviewed automatic merges.

### 3. Upgrade major dependencies in isolated compatibility slices

Before each slice, inspect release notes and peer requirements; upgrade the dependency and its directly coupled tooling together, then run the full validation matrix.

Suggested order:

1. **React 19 compatibility validated locally.** React Bootstrap 2.10.10 and Motion 12.43.0 resolve against React 19.3.0. Fresh `npm ci` and the local cross-browser matrix pass; hosted CI is still pending.
2. **Vite 8 compatibility validated locally.** Vite 8 replaces Rollup/esbuild production bundling with Rolldown/Oxc; the Vite 6 configuration was migrated to named code-splitting groups and the previous browser floor is explicit. Local full and cross-browser suites pass; hosted CI is still pending. See the [Vite migration guide](https://vite.dev/guide/migration.html) and [Rolldown code-splitting reference](https://rolldown.rs/reference/OutputOptions.codeSplitting).
3. ESLint 10 and compatible core/plugin packages; preserve the existing lint rules and ensure the full source tree is still covered after the hosted workflow passes.
4. UI/runtime libraries (Motion, Swiper, Font Awesome, PrimeIcons, Three.js) one ecosystem at a time, based on actual release-note relevance and usage.

The 2026-09-30 npm registry scan also found newer candidates for `@chenglou/pretext` 0.0.9, ESLint 10.11 with matching `@eslint/js` and React Hooks plugin updates, Font Awesome 7.3, Motion 13.4, PrimeIcons 8, Swiper 14, and Three.js 0.186. Keep each compatibility slice independent; availability alone is not a reason to upgrade.

Do not combine these into one large dependency PR. Defer any major that offers no concrete security, support, or user-facing benefit.

**Done when:** each slice has passing CI, checked release-note implications, and no unexplained console warnings or visual regressions.

### 4. Measure and address loading performance

Capture a repeatable baseline for the initial Home route and the Art route on a representative desktop and mid-range mobile profile. Record compressed transfer size, LCP, INP, and the cost of entering Art. The Vite 8 build reports a 609 KB raw / 154 KB compressed Three.js chunk, essentially unchanged from Vite 6; measure route-level impact before deciding whether it should load later or engines should split further. Review the 938 KB raw global CSS output in the same report, using compressed transfer and route coverage rather than raw size alone.

**Done when:** a before/after measurement supports each performance change and the responsive suite still passes.

### 5. Extend browser coverage after a stability check

Run the highest-value interaction flows in Firefox and WebKit. Fix genuine engine-specific issues first. The previous 11-test smoke group passed locally in Chromium, Firefox, and WebKit. The routine workflow now narrows cross-browser checks to profile layout, Education motion, map pinch/wheel behavior, and gallery dismissal, while Chromium retains broader page-density and responsive coverage. Keep the complete Chromium suite available for local validation and verify the hosted workflow before considering broader non-Chromium coverage.

**Done when:** the hosted workflow passes in all three engines and documented browser support matches the tested interactions, with no known engine-specific interaction regressions.

### 6. Reassess rewrite candidates from evidence

The initial inventory found `ArticleWebArt.jsx` at roughly 5,800 lines, followed by `PretextInteractiveText.jsx` (~1,370), `ArticleDataProbe.jsx` (~1,340), and `ArticleFeature.jsx` (~1,030). `ArticleWebArt` already has standalone artwork engines, but its controller, tile components, and game rules share one file. The Minesweeper rules are now extracted and covered. Next, map imports/state/style boundaries for a single tile component before moving it; do not mass-split the file. Responsive styles have 13 files with media/container queries and many intentional route-specific rules, so defer a broad consolidation until cascade ownership and duplicate declarations are inventoried.

**Done when:** each extracted module has clear ownership, unchanged user behavior, focused tests, and a smaller or simpler source boundary.

## Release gates

- `npm ci`
- `npm audit --audit-level=high`
- `npm run lint`
- `npm run test:layout`
- `npm run test:responsive:ci` with `RESPONSIVE_SMOKE=1`
- `npm run test:responsive:cross-browser` with `RESPONSIVE_SMOKE=1` in Firefox and WebKit
- `npm run test:responsive` for exhaustive Chromium validation when a change warrants it
- `npm run build`
- Review generated files and `git diff --check`

## Related guidance

- [Validation and deployment](../guides/validation.md)
- [Maintainer guide](../../MAINTANER.md)
- [Architecture overview](../architecture/overview.md)
