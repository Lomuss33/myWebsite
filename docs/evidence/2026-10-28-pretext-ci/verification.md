# Pretext deployment failure reproduction and verification

Date: 2026-10-28. Base revision: `594bf82`; fixes tested as uncommitted working-tree changes. Environment: Windows, Node 24.11.1, lockfile-based `npm ci`, Pretext 1.0.0, React/React DOM 19.3.1, Playwright 1.64.1, bundled Chromium 156.0.8078.4, Vite 8.3.5.

## Before fixes

After `npm ci`, `npx playwright install chromium`, and `npm run build`:

```powershell
$env:PLAYWRIGHT_TEST_BUILD = '1'
npx playwright test tests/deploy-smoke.spec.js --grep 'navigation, Back|direct link loads my-writings' --retries=0
```

All three selected tests failed, reproducing Actions run 40718087323. Both navigation cases reported a blank Canvas font passed to Pretext from Contact's resize observer after node removal. Writing timed out because manuscript height measurement used the pre-1.0 line-range argument order, preventing cursor advancement. Network trace from earlier Actions run 40717277903 showed successful manuscript asset requests before the page stalled; this was not evidence for a longer network timeout.

Earlier local passes used stale installed Pretext 0.0.9 and Playwright 1.63.0 rather than the lockfile. They are superseded by this reproduction.

## Fix and regression scope

Contact's narrative checks effect lifetime, DOM connection and usable geometry/typography before measuring. It preserves text while measurement is unavailable, caches prepared text across width changes, refreshes after font readiness, and avoids unchanged state writes. The manuscript uses width-before-cursor in both line-stream calls and rejects non-advancing cursors. The Writing deployment check waits for asynchronous initialization and verifies that navigation remains usable.

No package versions, artwork, styles, time budgets, test exclusions or uncaught-error assertions were changed.

## Results

- `npm run build`: passed, including resume generation and locale validation; existing large-chunk warning remains.
- `npm run lint`: passed.
- `npm run test:layout`: 5 passed.
- `npm run test:web-art`: 4 passed.
- `npm run test:startup-guide`: 24 passed.
- `PLAYWRIGHT_TEST_BUILD=1 npm run test:responsive:ci`: 14 passed, no retries, 34.5 seconds; English/dark, ordinary desktop and mobile, reduced motion.
- `PLAYWRIGHT_TEST_BUILD=1 npx playwright test tests/text-layout.spec.js --retries=0`: 2 passed, 9.7 seconds. Desktop dark/normal motion at 1366×768 then 1000×700; mobile light/reduced motion at 390×844 then 568×800. Checks manuscript initialization, resize completion, readable Contact narrative, browser Back/Forward and working form input, with uncaught errors retained.
- `npm audit --omit=dev`: zero reported vulnerabilities. Full audit separately reports a high-severity development-only Zod 4.6.5 advisory through eslint-plugin-react-hooks; dependency maintenance is outside these runtime fixes, and no automatic audit update was applied.

## Limits

These fixes have not been pushed or deployed. GitHub Linux verification, Firefox/WebKit, physical devices and exact visual appearance remain unverified. No visual measurements or screenshots gate deployment. A local Linux runtime was unavailable (Docker daemon not running; only Docker's WSL distribution installed).
