# Firefox decoration context creation

Status: local fixes complete — production publishing and Firefox recovery verification not performed. Updated: 2026-10-05.

## Objective and constraints

Restore original decorative shader bands on `lovro-music.de` in Windows 11 Firefox. Preserve the accepted artwork. The user explicitly rejected new fallbacks; the proposed 2D artwork and WebGL 1 compatibility paths were removed entirely.

## Findings

- User reports gradient-only bands on Education and Hardware. Their Firefox console reports `tryANGLE (FEATURE_FAILURE_EGL_NO_CONFIG)` followed by `FEATURE_FAILURE_WEBGL_EXHAUSTED_DRIVERS`.
- This is context creation failure before the website's GLSL is compiled. Firefox's [`GLContextProviderEGL.cpp`](https://github.com/mozilla-firefox/firefox/blob/main/gfx/gl/GLContextProviderEGL.cpp) emits the first failure when EGL cannot select a compatible driver configuration. Its internal context configuration does not use the site's drawing-buffer dimensions.
- Production's shader bundle is present and Career renders in the inspected Chromium browser. This does not establish Firefox support on the user's machine.
- Direct Windows UI Automation inspection of Firefox `about:support` confirmed WebGL 2 is available through AMD Radeon RX 9070 XT / ANGLE Direct3D11, driver `32.0.31041.1004`. Its Graphics failures record `video Present failed: 0x887a0005`, repeated `eglDestroySurface: 0x300e`, and repeated `CanvasTranslator failed creating WebGL shared context`. Microsoft identifies [`0x887A0005` as device removed/lost](https://learn.microsoft.com/en-us/windows/win32/direct3ddxgi/dxgi-error). This supports a transient browser graphics-device failure rather than a global WebGL block, but no timestamps establish which recorded failure caused the reported bands. Browser/driver settings were not changed.
- Separately, Actions run [37354326871](https://github.com/Lomuss33/myWebsite/actions/runs/37354326871) passed verification but publishing failed with `gh-pages -> gh-pages (fetch first)` during overlapping deployments.

## Local changes retained

- `canvasSizing.js` bounds existing decoration buffers to GPU limits and four million pixels. Career, Education, Hardware and Software use it without changing CSS geometry.
- Career and Education recreate shader resources after context restoration. Education initializes only actual band contexts and isolates failed bands. Resume can retry setup; existing 2D branches and falling text remain independent of shader availability.
- All five original shader owners use `shaderSetupRetry.js` for up to three delayed startup retries after failed context creation. A null initial context has no restoration event to wait for. Retries retain the same WebGL 2 artwork, stop while hidden/disposed, and can restart on resume/restoration.
- Education's descending smoothstep math now has defined equivalent behavior. Its RGB channel assignments and Career's loop retain the original artwork math.
- Deployment jobs use shared concurrency to avoid simultaneous pushes. Nothing was published or rerun.
- Canonical behavior is recorded in the responsive layout and validation guides. Unrelated working-tree edits were preserved.

## Next step and validation limits

Graphics diagnostics were obtained directly; no more user export is needed. If further work is requested, verify original-renderer recovery in Firefox against the updated build. Do not claim bounded retries repair a permanently unavailable browser graphics device, and do not add replacement artwork. No production publishing is authorized in this task.

Only source review, `git diff --check`, read-only production inspection, a local Career shader inspection and direct Firefox Graphics diagnostics were performed. No build, lint, automated suite, Firefox device-loss/recovery reproduction or deployment was run.
