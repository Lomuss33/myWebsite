# Validation and deployment

Verified: 2026-10-05 against [package.json](../../package.json), [Playwright config](../../playwright.config.js), [deploy workflow](../../.github/workflows/deploy.yml), and desktop density assertions in [responsive.spec.js](../../tests/responsive.spec.js).

## Checks by change

Use Node.js 24 LTS and `npm ci` for a lockfile-based install. Dependency engine requirements come from packages/lockfile. The workflow verifies lint, focused layout and browser checks, and the production build before deploying; pull requests run verification without deployment.

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

`npm run test:responsive:ci` is the routine CI gate. It runs Chromium checks for page loading, overflow, navigation, profile containment, project filtering, Education expansion, Hardware probe unlock, Art reveals, map gestures, and gallery dismissal. The section-fit subset samples six combinations that collectively cover all four locales, both themes, and mobile, normal, and ultrawide layouts. Exact typography, card density, decorative motion, and map styling remain in the full suite so intentional design revisions do not block ordinary deployment.

The workflow builds once before browser checks, then serves that same `dist/` artifact on localhost:4173 with `PLAYWRIGHT_TEST_BUILD=1`. Built-site runs allow one retry for a transient failure; persistent failures still fail verification. They never reuse an unrelated local server. Firefox and WebKit interaction checks are available by enabling **extended_browser_checks** on manual workflow dispatch, or through the local cross-browser command.

`npm run test:responsive` remains the exhaustive local suite: it runs the detailed Playwright tests and the full 24-case locale/theme/layout matrix in Chromium. Use it when changing broad responsive behavior or investigating a regression. For the required CI-sized suite locally, run:

```powershell
npm run build
$env:PLAYWRIGHT_TEST_BUILD = '1'
$env:RESPONSIVE_SMOKE = '1'
npm run test:responsive:ci
Remove-Item Env:RESPONSIVE_SMOKE
Remove-Item Env:PLAYWRIGHT_TEST_BUILD
```

To run the smaller engine-specific smoke suite locally, install the browsers and select one:

```powershell
$env:PLAYWRIGHT_BROWSER = 'firefox'
$env:RESPONSIVE_SMOKE = '1'
npm run test:responsive:cross-browser
Remove-Item Env:RESPONSIVE_SMOKE
Remove-Item Env:PLAYWRIGHT_BROWSER
```

The default local Playwright config starts/reuses the development server on localhost:5173. `PLAYWRIGHT_TEST_BUILD=1` selects the built site on localhost:4173 and requires an existing production build. Both modes default to reduced motion and write `test-results/`. Check that the server serves the intended tree. Inspect assertions before treating tests as current product requirements. ESLint ignores disposable `docs/tmp/` experiments and generated scratch bundles, matching that directory's Git policy.

Desktop density assertions follow the current component design: Education article headings cap at 2.3rem, Hardware's glass-workspace summary has 54px rows plus padding, and Art's creator grid has five square tiles per row. These checks retain content-size limits, overflow checks, and 44px interactive targets. A visual revision can require updating these contracts without changing the deployment workflow.

Section-opening tests wait for the requested section to be shown, its lazy content to resolve, and its heading to render. Multi-section layout checks navigate within the loaded app and poll the expected geometry, avoiding repeated cold reloads and global font/image waits. The full suite splits the page-title comparison into one test per viewport and waits for the actual size comparison instead of three identical subpixel samples. Hover-motion checks poll the computed transform within a restrained range, then verify zero translation and zero transition duration under reduced motion. Keep these checks tied to rendered state rather than fixed sleeps.

Sample narrow portrait, tablet, desktop, short ultrawide, both themes, and en/de/hr/tr as appropriate. Check image visibility after cached reloads, text/circle boundaries, cycling, Escape, hover, and pinning. Animation changes need a normal-motion check too.

Retained evidence records revision/dirty-tree state, viewport, browser, theme, language, motion, command, result, and limits. A build is not a visual or accessibility audit.

## Known gaps

Real mobile keyboards/safe areas, browser zoom, weak GPUs, and device rendering still require manual verification. The focused Chromium matrix samples all supported locales, both themes, and all three viewport classes, but not every possible combination. Optional Firefox and WebKit checks cover targeted English/dark interactions; routine pushes run Chromium only. These checks do not replace physical-device or other operating-system testing.

## Deployment

The workflow verifies pull requests and runs on `main` pushes or manual dispatch. After lint, unit checks, the production build, and the focused Chromium suite pass, it publishes the same tested `dist/` artifact to GitHub Pages with CNAME `lovro-music.de` and `keep_files: true`. Enabling extended browser checks also requires the Firefox and WebKit interaction suites to pass before publishing.

Author sources, not generated output. Documentation work does not require publishing. Before intended deployment, review runtime compatibility and generated changes; the workflow is the operational source of truth.
