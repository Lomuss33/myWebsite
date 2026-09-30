# Validation and deployment

Verified: 2026-09-30 against [package.json](../../package.json), [Playwright config](../../playwright.config.js), and [deploy workflow](../../.github/workflows/deploy.yml).

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

`npm run test:responsive:ci` is the routine CI gate. It runs the high-value responsive, density, map, profile, and gallery checks in Chromium, including touch-pinch behavior. The section-fit subset samples six combinations that collectively cover all four locales, both themes, and mobile, normal, and ultrawide layouts. Firefox and WebKit run a smaller interaction smoke set for profile layout, education motion, map wheel behavior, and the gallery. This keeps engine-specific coverage while avoiding repeating the entire responsive suite three times.

`npm run test:responsive` remains the exhaustive local suite: it runs the detailed Playwright tests and the full 24-case locale/theme/layout matrix in Chromium. Use it when changing broad responsive behavior or investigating a regression. For the required CI-sized suite locally, run:

```powershell
$env:RESPONSIVE_SMOKE = '1'
npm run test:responsive:ci
Remove-Item Env:RESPONSIVE_SMOKE
```

To run the smaller engine-specific smoke suite locally, install the browsers and select one:

```powershell
$env:PLAYWRIGHT_BROWSER = 'firefox'
$env:RESPONSIVE_SMOKE = '1'
npm run test:responsive:cross-browser
Remove-Item Env:RESPONSIVE_SMOKE
Remove-Item Env:PLAYWRIGHT_BROWSER
```

The Playwright config starts/reuses localhost:5173, defaults to reduced motion, and writes `test-results/`. Check that the server serves the intended tree. Inspect assertions before treating tests as current product requirements.

Section-opening tests wait for the requested section to be shown, its lazy content to resolve, and its heading font and geometry to become ready; they do not wait for unrelated page fonts or image-load events. Hover-motion checks poll the computed transform within a restrained range, then verify zero translation and zero transition duration under reduced motion. Keep these checks tied to rendered state rather than fixed sleeps.

Sample narrow portrait, tablet, desktop, short ultrawide, both themes, and en/de/hr/tr as appropriate. Check image visibility after cached reloads, text/circle boundaries, cycling, Escape, hover, and pinning. Animation changes need a normal-motion check too.

Retained evidence records revision/dirty-tree state, viewport, browser, theme, language, motion, command, result, and limits. A build is not a visual or accessibility audit.

## Known gaps

Real mobile keyboards/safe areas, browser zoom, weak GPUs, and device rendering still require manual verification. The automated matrix covers Chromium across viewport classes, themes, and supported locales, plus targeted English/dark interaction checks in Firefox and WebKit; it does not replace checks on physical devices or other operating systems.

## Deployment

The workflow verifies pull requests and runs on `main` pushes or manual dispatch. After lint, unit checks, the focused Chromium suite, Firefox/WebKit interaction smoke tests, and the production build pass, it publishes the saved `dist/` artifact to GitHub Pages with CNAME `lovro-music.de` and `keep_files: true`.

Author sources, not generated output. Documentation work does not require publishing. Before intended deployment, review runtime compatibility and generated changes; the workflow is the operational source of truth.
