# Shared image gallery

Feature ID: `image-gallery`. Search names: one gallery, photo album, screenshots, fullscreen viewer, swipe images, pinch zoom, lightbox.

All local photo/screenshot albums use one viewer. The current content has seven Photography albums and four Digital Expression albums on `#my-art`; their existing previews and image order remain independent collections.

Verified: 2026-10-16 against shared entry points, native dialog/Swiper implementation, repository Chromium checks, targeted Firefox/WebKit checks and native preview inspection. Engine-specific scope is recorded below; physical phone gestures remain unverified.

## Accepted behavior

- Use one fullscreen, horizontal, one-image-at-a-time viewer at every viewport size and for every image shape. Callers supply only images and a title; do not add direction, aspect-ratio or showcase modes. Empty/invalid collections do not open.
- Swipe horizontally, use the Previous/Next buttons, or press Left/A and Right/D to move through images. Letter shortcuts are case-insensitive, including Shift/Caps Lock. The open dialog handles these keys directly; do not rely on a document-level slider keyboard listener or intercept Alt/Ctrl/Meta combinations. Keep a compact image counter rather than an unbounded strip of dots. The first/last navigation buttons disable at the album boundaries. Preserve the active image while resizing or rotating.
- Pinch, double-tap or use the zoom button to inspect an image. Two-finger gestures temporarily suspend slide navigation so releasing a pinch cannot advance the album. While zoomed, vertical gestures pan the image rather than dismissing the viewer.
- Keep Close visible with at least a 44px target and initial focus. Close also works with Spacebar, Escape, browser/device Back, a tap on empty image-stage space, or an unzoomed vertical touch swipe. Space closes even while an arrow/zoom button has focus, suppressing its normal button activation. Expose shortcuts with `aria-keyshortcuts` on the matching controls. A tap on the image itself does not close it. Treat repeated close requests as one operation until asynchronous history traversal finishes, so rapid taps cannot leave the album page. Tab/Shift+Tab cycle through enabled controls; when a focused arrow becomes disabled at an album boundary, focus moves to Close so shortcuts stay usable. The native dialog makes the page inert, returns focus to the opening link, and leaves the underlying page's scroll position intact. A temporary same-URL history entry makes Back close the viewer before leaving its page.
- Fit the complete image without cropping; keep loading/errors local to each slide. The viewer and exit controls never wait for all images to load. Mount only the current and adjacent image surfaces, with the active image prioritized. Respect reduced motion, device safe areas, and localized labels in EN/DE/HR/TR. Keep the stage dark and the controls matched to the website theme.

## Ownership and dependencies

| Owner | Responsibility |
|---|---|
| [GalleryLink.jsx](../../src/components/generic/GalleryLink.jsx), [Link.jsx](../../src/components/generic/Link.jsx) | Validate images and open the common viewer with its triggering link |
| [FeedbacksProvider.jsx](../../src/providers/FeedbacksProvider.jsx) | One lazy-mounted viewer target; no presentation options |
| [GalleryModal.jsx](../../src/components/modals/GalleryModal.jsx), [GalleryModal.scss](../../src/components/modals/GalleryModal.scss) | Body-portaled native dialog, history/focus lifecycle, Swiper gestures, keyboard/zoom, image sizing and controls |
| [galleryI18n.js](../../src/data/galleryI18n.js) | Previous/next/zoom/error labels in all supported languages |
| [ArticleTimeline.jsx](../../src/components/articles/ArticleTimeline.jsx), [ArticleItemPreviewMenu.jsx](../../src/components/articles/partials/ArticleItemPreviewMenu.jsx) | Album previews and title/image metadata; no viewer-layout decisions |
| [my-art.json](../../public/data/sections/my-art.json) | Album collections and authored image order; existing aspect-ratio metadata does not select a viewer |
| [gallery.spec.js](../../tests/gallery.spec.js), [responsive.spec.js](../../tests/responsive.spec.js) | All album entry points, dismissal/focus/scroll, gestures/zoom, failure states and resize checks |

## Focused verification

Run `npm run test:gallery`. It opens every visible entry point for all 11 albums in Croatian/light mobile and English/dark desktop layouts. Separate checks cover German keyboard/zoom/Back/Escape/backdrop and scroll restoration, Turkish native Chromium touch swipes/pinch/vertical dismissal, failed single-image albums, and fullscreen containment through mobile/normal/ultrawide changes. Touch injection uses Chromium CDP; it is skipped when this file runs with another engine. The gallery checks are also included in the routine responsive CI command.

The suite also checks several close requests arriving before history traversal completes, reopening afterward, actual double-tap zoom, retaining the selected image through portrait/landscape rotation, normal-motion navigation, live reduced-motion changes, focus cycling and shortcuts after disabling a focused boundary arrow. For targeted cross-engine checks, set `PLAYWRIGHT_BROWSER` to `firefox` or `webkit` and run `npx playwright test tests/gallery.spec.js --grep 'supports keyboard|repeated close|double-tap zoom|animated navigation'`; restore the environment afterward.

For rendered changes, inspect both themes on a phone, short landscape, desktop and ultrawide viewport. Confirm the image remains contained, the counter/Close remain visible, pinching stays on the current image, and repeated open/close returns focus and scroll without leftover history/scroll locks.

On 2026-10-15 all six focused Chromium checks passed against the production build, as did lint, production prebuild/build and documentation path validation. Native preview inspection confirmed image containment, zoom and Escape/focus restoration in the light desktop viewer; the mobile gesture check used native touch injection, including pinch release staying on the same image. Physical-device and other-engine checks remain outside this revision's verified scope.

On 2026-10-16 the eight-check Chromium suite passed against the production build. Three targeted checks each passed in Firefox and WebKit: keyboard/zoom/Back/Escape/backdrop/focus/scroll, repeated closing/reopening, and double-tap zoom with rotation. This pass fixed rapid close requests traversing past the album page and unresponsive arrow keys in Firefox/WebKit. Native preview ArrowRight advanced the counter and Escape restored the opening link; lint, full production build and documentation validation passed. Physical phone behavior and the complete cross-engine album matrix remain unverified.

The 2026-10-16 shortcut follow-up added case-insensitive A/D navigation and Spacebar dismissal, with shortcut metadata on the controls. Buttons and keys now select the adjacent image by explicit index, avoiding backward snap rounding that skipped an image in Firefox/WebKit. All eight production-build Chromium checks passed again, plus the expanded keyboard check in each of Firefox and WebKit, including lower/uppercase A/D, arrow buttons/keys and Space while Next has focus. Native preview confirmed D/A changing the counter and Space restoring focus to the opening link. Lint, full production build and documentation validation passed.

The final review on 2026-10-16 fixed focus escaping through Tab cycling or a focused arrow becoming disabled. All nine production-build Chromium checks passed. The new normal-motion/focus/boundary check passed in Firefox and production WebKit, including live reduced-motion switching and Space dismissal. WebKit development runs stalled at the Art section loader before opening the viewer; the built-site check passed. Native preview confirmed focus cycling and Space returning focus to the album link. Lint and the full production build passed; physical-device scope remains unchanged.
