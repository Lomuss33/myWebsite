# Validation and deployment

Verified: 2026-09-11 against [package.json](../../package.json), [Playwright config](../../playwright.config.js), and [deploy workflow](../../.github/workflows/deploy.yml).

## Checks by change

Use `npm ci` for a lockfile-based install. Dependency engine requirements come from packages/lockfile; the deployment runtime is not automatically a tested local recommendation.

| Change | Checks |
|---|---|
| Documentation | Relative links, source paths, commands, status labels |
| JSON/locales | Parse JSON, `npm run validate:i18n`, inspect rendered content |
| Code/styles | `npm run lint`, `npm run build`, focused behavior checks |
| Mode resolver | `npm run test:layout` |
| Responsive behavior | Relevant Playwright spec |
| CV | `npm run cv:generate`, inspect output, build |
| Images | `npm run images:generate`, inspect output, build |

ESLint alone does not validate JSON content. `npm run build` runs prebuild resume preparation, CV generation, and locale validation. `npx vite build` bypasses prebuild; distinguish them in reports.

## Browser checks

Install a browser once, e.g. `npx playwright install firefox`. `npm run test:responsive` defaults to Chromium. For Firefox in PowerShell:

```powershell
$env:PLAYWRIGHT_BROWSER = 'firefox'
npx playwright test tests/mobile-profile.spec.js
Remove-Item Env:PLAYWRIGHT_BROWSER
```

The config starts/reuses localhost:5173, defaults to reduced motion, and writes `test-results/`. Check that the server serves the intended tree. Other specs: `tests/profile-fit.spec.js`, `tests/responsive.spec.js`. Inspect assumptions before treating tests as current product requirements.

Sample narrow portrait, tablet, desktop, short ultrawide, both themes, and en/de/hr/tr as appropriate. Check image visibility after cached reloads, text/circle boundaries, cycling, Escape, hover, and pinning. Animation changes need a normal-motion check too.

Retained evidence records revision/dirty-tree state, viewport, browser, theme, language, motion, command, result, and limits. A build is not a visual or accessibility audit.

## Known gaps

Real mobile keyboards/safe areas, browser zoom, weak GPUs, and device rendering require manual verification. Recent Home checks are samples, not all combinations. CI currently selects Node 18; dependency/runtime compatibility needs separate assessment, not silent changes during documentation work.

## Deployment

The workflow runs on `main` pushes and manual dispatch, installs dependencies, validates locales, builds, and publishes `dist/` to GitHub Pages with CNAME `lovro-music.de` and `keep_files: true`.

Author sources, not generated output. Documentation work does not require publishing. Before intended deployment, review runtime compatibility and generated changes; the workflow is the operational source of truth.
