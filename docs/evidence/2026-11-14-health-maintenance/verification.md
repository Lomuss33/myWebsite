# Health maintenance verification

Date: 2026-11-14. Source synchronized by fast-forward from `197f9f6` to remote main `cbf99c5f02614502913ed59dac9cf045ab588b1f`. Windows, Node 24.11.1, npm 11.6.2. Existing uncommitted DataProbe extraction, its new files/test/script, and roadmap edit were saved in stash `7f19fd8288619251ec7199a77e41e45f735abbf5` and restored after synchronization. All nine original DataProbe/roadmap files matched the checkpoint after CRLF normalization; the added npm script was also preserved. The backup stash is retained.

## Dependency patch

`npm ci` first installed the updated remote lockfile. `npm update zod --ignore-scripts` selected Zod 4.6.7 within existing transitive ranges. The generated version, registry URL and integrity values were retained; unrelated npm platform/peer metadata rewrites were discarded. The initial Zod patch changed no other package versions. Subsequent Windows build verification exposed the Sass packaging issue described below. The root manifest's only uncommitted change remains the user's `test:data-probe` script.

The lockfile moves the development-only Zod dependency from 4.6.5 to 4.6.7, addressing [GHSA-mrhx-c7xc-m3w5](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5). Validation uses a fresh `npm ci` after minimizing the lockfile change, with no override or direct dependency added.

## Windows build issue exposed by synchronization

After synchronization, a clean install of locked Sass Embedded 1.108.0 made `npm run build` fail with `sass --embedded is unavailable in pure JS mode` and `write EOF`. `npm pack sass-embedded-win32-x64@1.108.0 --pack-destination docs/tmp --json` confirmed that the official package archive contains only README, package metadata, `dart.exe` and LICENSE; neither `sass.bat` nor `sass.snapshot` is present. This is not a local missing-file assumption.

The 1.108.2 registry archive includes both compiler files. `npm update sass-embedded --ignore-scripts` selected the 1.108.2 patch and its matching platform packages, along with the Sass 1.108.2 peer package. The maintenance diff retains those npm-generated package changes and Zod only; unrelated resolver/platform metadata churn is discarded. No direct dependency, override, application code or visual assertion is added. A direct `sass-embedded.compileString()` probe succeeds with the patched compiler; final validation is from a fresh `npm ci` below.

## Hosted deployment

[Actions run 43033421188, attempt 2](https://github.com/Lomuss33/myWebsite/actions/runs/43033421188/attempts/2) was retried with `gh run rerun 43033421188 --failed`. Linux verification passed all 14 deployment behavior checks in 42.8 seconds, and the deploy job succeeded. The `gh-pages` publication commit is `516b8b6b2424afbc5f677a32a8b7725ab5b443e1`, with message `deploy: cbf99c5f02614502913ed59dac9cf045ab588b1f`, published at 2026-11-14 18:06:56 UTC.

Attempt 1 failed because Ubuntu archive/security servers could not be resolved during Playwright's system-dependency installation. Browser tests never ran in that attempt. The successful retry used the same source commit; no workflow or test weakening was applied.

The baseline hosted publication above predates the Zod/Sass fixes. The maintenance commit includes only the lockfile and verification documentation; the restored DataProbe work remains outside it. For maintenance commits, verify the source SHA in the new Actions run. If the output is unchanged, the no-change deploy log is authoritative and the `gh-pages` source message can remain at the baseline SHA.

## Hosted maintenance verification

Maintenance commit `53e9a76ebba6ddb3c99789611241e77c45ae924e` was pushed to `main`. [Actions run 43626945153](https://github.com/Lomuss33/myWebsite/actions/runs/43626945153) passed verification and deployment. The clean Linux install reported zero vulnerabilities; all 14 browser checks passed in 44.2 seconds. Deploy completed at 2026-11-14 18:32:42 UTC.

The tested output matched the existing site exactly. The deploy log reported `nothing to commit, working tree clean`, `skip commit` and `Everything up-to-date`. Therefore `gh-pages` legitimately remains at publication commit `516b8b6b2424afbc5f677a32a8b7725ab5b443e1`, whose source message is the earlier `cbf99c5`. Both the live homepage and resume PDF returned HTTP 200 after the maintenance run. No empty commit was forced.

The maintenance commit contains only the dependency lockfile and verification documentation. The DataProbe extraction, new files/test/script and roadmap edit remain uncommitted and intact, with the original checkpoint retained.

## Local results

All checks below ran against synchronized source `cbf99c5` plus the preserved DataProbe work and local Zod/Sass lockfile patches:

- Fresh `npm ci`: passed, 362 packages installed; audit reports zero vulnerabilities.
- Direct embedded Sass compilation: passed with 1.108.2 after the clean install.
- `npm run build`: passed (Vite 8.3.6, including resume/CV generation and locale validation). Existing large-chunk warning remains; the separate Three.js chunk is 664.36 kB raw / 166.41 kB gzip.
- `npm run lint`: passed.
- `npm run validate:docs`: passed (22 documents, 260 local links); the evidence page was also checked explicitly.
- `node --test npm/responsive-layout.test.js npm/web-art-minesweeper.test.js npm/startup-guide.test.js npm/project-stickers.test.js npm/data-probe.test.js`: 44 passed.
- `npm audit`: zero reported production or development vulnerabilities. `npm audit --omit=dev` also passed.
- `PLAYWRIGHT_TEST_BUILD=1 npx playwright test tests/deploy-smoke.spec.js tests/text-layout.spec.js`: 16 passed, no retries, 42.3 seconds, bundled Chromium on Windows. The routine deployment gate remains 14 tests; the other two are optional text-layout lifecycle regressions.
- HTTP HEAD to `https://lovro-music.de/` and `/resume.pdf`: both 200 following publication.
- Lockfile review: only Zod and Sass ecosystem package entries differ from remote main. No unrelated metadata/versions changed, and the lockfile root manifest is unchanged.
- `git diff --check`: passed.

## Limits

Hosted verification covers maintenance commit `53e9a76`; local checks additionally include the uncommitted DataProbe work. That unpublished refactor has not been checked by hosted CI. No full visual matrix or physical-device audit was performed. The ESLint 9 pin remains per the existing plugin-compatibility policy.
