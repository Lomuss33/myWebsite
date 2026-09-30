# Validation and deployment

Verified: 2026-09-30 against [package.json](../../package.json), [Playwright config](../../playwright.config.js), and [deploy workflow](../../.github/workflows/deploy.yml).

## Checks by change

Use Node.js 24 LTS and `npm ci` for a lockfile-based install. Dependency engine requirements come from packages/lockfile. The workflow verifies lint, layout tests, the full Chromium responsive suite, and the production build before deploying; pull requests run verification without deployment.

Dependabot checks npm and GitHub Actions weekly. Development-tool patch updates are grouped; security and major updates remain separately reviewable. See [.github/dependabot.yml](../../.github/dependabot.yml).

| Change | Checks |
|---|---|
| Documentation | Relative links, source paths, commands, status labels |
| JSON/locales | Parse JSON, `npm run validate:i18n`, inspect rendered content |
| Code/styles | `npm run lint`, `npm run build`, focused behavior checks |
| Mode resolver | `npm run test:layout` |
| Minesweeper Web Art rules | `npm run test:web-art` |
| Responsive behavior | Relevant Playwright spec |
| CV | `npm run cv:generate`, inspect output, build |
| Images | `npm run images:generate`, inspect output, build |

ESLint alone does not validate JSON content. `npm run build` runs prebuild resume preparation, CV generation, and locale validation. `npx vite build` bypasses prebuild; distinguish them in reports.

## Browser checks

Install a browser once, e.g. `npx playwright install firefox`. `npm run test:responsive` runs the full suite in Chromium by default. For a focused cross-browser smoke run, install Firefox and WebKit and run this PowerShell example:

```powershell
$env:PLAYWRIGHT_BROWSER = 'firefox'
$env:RESPONSIVE_SMOKE = '1'
npm run test:responsive:cross-browser
Remove-Item Env:RESPONSIVE_SMOKE
Remove-Item Env:PLAYWRIGHT_BROWSER
```

Set `RESPONSIVE_SMOKE=1` as well to limit the locale/theme layout matrix to its representative English/dark cases. The focused suite checks profile fit, page-title sizing and mobile/normal/ultrawide section fit, Education motion, Hardware card density, Contact map controls and wheel behavior, and the Art gallery. CI runs the full suite in Chromium and this focused suite in Firefox and WebKit. The config starts/reuses localhost:5173, defaults to reduced motion, and writes `test-results/`. Check that the server serves the intended tree. Inspect assertions before treating tests as current product requirements.

Section-opening tests wait for the requested section to be shown, its lazy content to resolve, and its heading font and geometry to become ready; they do not wait for unrelated page fonts or image-load events. Hover-motion checks poll the computed transform within a restrained range, then verify zero translation and zero transition duration under reduced motion. Keep these checks tied to rendered state rather than fixed sleeps.

Sample narrow portrait, tablet, desktop, short ultrawide, both themes, and en/de/hr/tr as appropriate. Check image visibility after cached reloads, text/circle boundaries, cycling, Escape, hover, and pinning. Animation changes need a normal-motion check too.

Retained evidence records revision/dirty-tree state, viewport, browser, theme, language, motion, command, result, and limits. A build is not a visual or accessibility audit.

## Known gaps

Real mobile keyboards/safe areas, browser zoom, weak GPUs, and device rendering still require manual verification. The automated matrix covers Chromium across viewport classes, themes, and supported locales, plus targeted English/dark interaction checks in Firefox and WebKit; it does not replace checks on physical devices or other operating systems.

## Deployment

The workflow verifies pull requests and runs on `main` pushes or manual dispatch. After lint, layout tests, the full Chromium suite, and the production build pass, it publishes the saved `dist/` artifact to GitHub Pages with CNAME `lovro-music.de` and `keep_files: true`.

Author sources, not generated output. Documentation work does not require publishing. Before intended deployment, review runtime compatibility and generated changes; the workflow is the operational source of truth.
