# Decorative bands

Feature ID: `section-decoration-bands`. Search names: decoration strip, bottom buffer, shader, gradient only, curtain, garden, sad-face background.
Purpose: animated artwork separates articles and ends decorated sections without competing with navigation or changing the accepted artwork.

Verified: 2026-10-06 by review of band mounting, sizing/retry helpers and existing renderer/layout guidance. Earlier Firefox diagnostics and Android observations retain their original limits in the [Firefox investigation](../work/2026-10-05-firefox-decoration-context.md). No new renderer/browser checks, physical Android suspension reproduction or Firefox recovery checks were run.

## Accepted behavior

- Keep bands at section width. Headerless decorated pages start flush with their pane; no fullscreen-control cap, section padding or wrapper padding separates the top band from the edge.
- On desktop, the final band reaches the section edge with zero decorated-section bottom padding. On mobile, native scroll content reserves exactly the fixed bottom-navigation footprint, safe area and visual-viewport offset **outside** the band. At maximum scroll, the band's bottom meets the navigation bar's top. Do not extend artwork behind that bar or add a blank gap. Only undecorated wrappers get the extra 1rem gap.
- The original Education/Career/Hardware/Software shaders require WebGL 2. Retry the original renderer, not new fallback artwork. Existing CSS gradients remain visible if context creation fails. Retry delays are 600/1600/4000ms; hiding/disposal cancel pending work, and resume/restoration may begin another cycle.
- Shared GPU buffers stay within four million pixels, 4096px per dimension and reported renderbuffer/viewport limits; Career keeps tighter limits. CSS geometry/artwork coordinates stay unchanged. No minimum pixel ratio may defeat these caps. Education isolates a failed band; Career branches and Software falling text are independent of shader availability.
- Education expansion follows the [coordinate stability policy](responsive-layout.md#styling-ownership). That policy records the current source-reviewed expansion change and its unverified browser scope; do not reset pattern coordinates or animation during article reflow.
- Writings wood and the outer garden use viewport-sized crops with full-page artwork coordinates, at most two million pixels and 4096px per dimension (plus GPU limits for Writings). They stop work and shrink buffers to 1×1 on pause/hiding, then remeasure/redraw on return. The lifecycle bridge forwards visibility, page history and native freeze/resume. Recreate lost shader resources; the garden also handles 2D context loss/restoration.

## Ownership and dependencies

| Owner | Role / start here for |
|---|---|
| [SectionContent.jsx](../../src/components/sections/SectionContent.jsx), [SectionDecorationBand.jsx](../../src/components/sections/SectionDecorationBand.jsx) | Band ordering, markers and section mounting; Art bands mount their own canvas |
| [SectionContent.scss](../../src/components/sections/SectionContent.scss), [Scrollable.scss](../../src/components/capabilities/Scrollable.scss), [_sizing.scss](../../src/styles/_sizing.scss) | Band heights, boundaries and navigation padding; see shared [mode authority](responsive-layout.md#mode-authority) |
| [SectionDecorationLayer.jsx](../../src/components/sections/decorations/SectionDecorationLayer.jsx) | Dispatch to each page's artwork owner |
| [canvasSizing.js](../../src/components/sections/decorations/canvasSizing.js), [shaderSetupRetry.js](../../src/components/sections/decorations/shaderSetupRetry.js) | GPU limits and original-renderer setup retries |
| [EducationDecorationCanvas.jsx](../../src/components/sections/decorations/education/EducationDecorationCanvas.jsx), [ExperienceDecorationCanvas.jsx](../../src/components/sections/decorations/experience/ExperienceDecorationCanvas.jsx) | Band coordinate stability, masks and context restoration |
| [HardwareDecorationCanvas.jsx](../../src/components/sections/decorations/hardware/HardwareDecorationCanvas.jsx), [SoftwareDecorationCanvases.jsx](../../src/components/sections/decorations/software/SoftwareDecorationCanvases.jsx) | Hardware shader and Software shader/text lifecycle |
| [WritingDecorationSvg.jsx](../../src/components/sections/decorations/writing/WritingDecorationSvg.jsx), [LayoutBufferGarden.jsx](../../src/components/layout/LayoutBufferGarden.jsx), [main.jsx](../../src/main.jsx) | Viewport crops, 2D/GPU recovery and application lifecycle events |

## Confirmed issues and limits

The reported production Firefox errors (`FEATURE_FAILURE_EGL_NO_CONFIG`, `FEATURE_FAILURE_WEBGL_EXHAUSTED_DRIVERS`) occurred during context creation, before shader drawing. Direct graphics inspection found available WebGL 2 alongside device/shared-context failures; the exact trigger remains unconfirmed. The original-renderer recovery changes are locally complete but unpublished in the recorded investigation. Do not claim Firefox recovery or a production fix without observing it.

The Android Writings report affected only the background while the site stayed usable. Earlier inspection found oversized buffers and confirmed viewport-sized buffers afterward; it did not reproduce phone suspension or prove that this caused the sad face. Education expand/collapse coordinate isolation was source-reviewed, with browser behavior still unverified in that change.

## Focused verification

1. Scroll decorated pages to the end on a phone and desktop; expect the final band to meet the navigation/pane edge without a gap or extension. Check headerless starts too.
2. Expand/collapse Education at fixed width; expect stable artwork/masks and animation time, while lower bands move with content. Repeat with reduced motion and restored context.
3. Inspect buffer dimensions and GPU limits on a long page; expect bounded buffers and unchanged CSS/artwork proportions.
4. Hide/resume or simulate context loss/restoration; expect canceled hidden work and recovery of the original renderer. A failed initial context needs setup retry because it produces no restoration event.
5. Inspect both themes and native scroll/visual-viewport movement; expect crops, separators and navigation geometry to stay aligned. Record browser/device and distinguish source review from observed recovery.
