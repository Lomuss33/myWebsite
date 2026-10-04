# Maintenance workflows

Verified: 2026-09-27 against commands and source locations, including artist spotlight configuration and registration. Code-span paths are repository-relative.

[Documentation index](../README.md) | [Validation](validation.md)

## Common Tasks

### Add or reorder sections

1. Edit `public/data/sections.json`.
2. Add or update the related file in `public/data/sections/`.
3. Make sure `categoryId` exists in `public/data/categories.json`.

### Add a new item

1. Open the target section JSON file.
2. Find the relevant article.
3. Add a new entry to `items`.
4. Keep the `id` unique within that article.
5. Only add fields used by that renderer.

My Art's photography cards display `album_last_upload` from `public/data/sections/my-art.json` in their date metadata. Its `date` contains the latest photo's upload year, month, and day, verified by opening the newest photo in the linked VSCO space. Set `status: "empty"` when the space has no photos or `status: "unavailable"` when the album link does not resolve, and record `verified_on` for either case. These statuses have translations in `public/data/strings.json`. The item's separate top-level `date` retains the travel chronology and card ordering. Upload dates are curated snapshots, so recheck the linked space when its photos change; the space's publication date is not an upload date. Checked on 2026-10-04: Macedonia 2025-12-21, Greece 2025-12-01, Bulgaria 2025-10-23; Serbia, Bosnia, and Croatia had no photos, and the Germany placeholder URL returned 404.

### Add a new article type

1. Create the component in `src/components/articles/`.
2. Add its SCSS if needed.
3. Register the loader in `src/components/sections/SectionBody.jsx`.
4. Register the lazy component in `src/components/sections/SectionBody.jsx`.
5. Reference the new `component` name from section JSON.

For `ArticleArtistSpotlight`, put profile, banner, links, and latest-release fields in `settings.artist_spotlight`. Keep user-facing labels localized under that setting's `labels` object. Images use authored paths under `public/images/`. Set `latestRelease.audioSrc` and `startOffsetSeconds` for a local song; its first play begins at that offset, and the seek bar can reach the full recording. Local playback starts at 35% volume; its transparent control sits immediately left of the guiding-idea label. While the artist article is visible on the shown section page, a window-level pointer listener tracks the portrait across the viewport, including navigation rails. It updates the 3D tilt, ring parallax, and glass highlight, then resets when the article leaves view. On mobile, while the spotlight fills most of the viewport, device orientation tilts the portrait when the browser provides orientation events without prompting; reduced-motion preferences disable tilt animation. With local audio, mouse hover over each platform link starts its reduced-volume preview at that segment's midpoint after a one-second dwell; leaving sooner cancels the pending start. Hovering the portrait starts all five previews together immediately, with their individual volumes divided so their combined level matches one platform preview. Leaving a hover target fades its preview to silence over three seconds; entering a different target starts its preview while the previous one fades, with the total hover mix capped at one preview's volume. Re-entering a preview during its fade cancels the fade. Hover previews use separate audio from the main play button. A Spotify track URI or URL remains an optional embedded-player source when no local audio is set. The artist portrait and short “Open on Spotify” action both link to the artist profile. The action is centered over the horizontal seam between the banner and release bands; hero copy leads on the left of the portrait, and names wrap instead of truncating. Place new My Art entries with the section's explicit article ordering in `SectionContent.scss` so existing generated article IDs remain stable.

`ArticleWebArt` uses `settings.web_art_presentation: "carousel"` for its layered card gallery. `LayeredCardCarousel` owns the deck, swipe navigation from the stage surface, immediate previous/next side cards (left is −1, right is +1, both wrap), numbered visit trail, and adaptive window layout; `ArticleWebArt` owns the artwork engines and the list of up to three pinned extras. On narrow layouts, exactly three visible artworks form a 2×2 grid with an add tile in the fourth cell; selecting it pins the next work or advances to an unpinned work when the pin limit is already used. Pin controls keep 44px hit areas with 28px square corner visuals, and gated artwork controls use matching compact heights and type. Touch gestures that begin inside open artwork stay with that artwork; side cards and controls use taps. Pinning advances to the next card and keeps the pinned work live. Where supported, the View Transitions API animates changes involving a pinned window; ordinary card navigation uses the deck reveal animation. The static layout remains available in other browsers and for reduced-motion users. The numbered index includes every authored and ambient work plus Send Yours, fills balanced rows with square buttons and no scrollbar, and supports Left/Right and Home/End keys from its single tab stop. Gallery chrome follows the active light/dark theme. The closed gallery folds edge-on at 90 degrees, is transparent, and reserves only a 1px stage. Set the presentation to `"grid"` to restore the previous multi-card gallery without changing the artwork implementations.

### Change theme styling

Main files:

- `src/styles/themes/_variables-theme-dark.scss`
- `src/styles/themes/_variables-theme-light.scss`
- `src/styles/themes/_theme-variables-builder.scss`

Supporting files:

- `src/styles/layout/*`
- `src/styles/_tokens.scss`
- `src/styles/app.scss`

### Change navigation or routing behavior

Main files:

- `src/providers/LocationProvider.jsx`
- `src/providers/NavigationProvider.jsx`
- `src/providers/ViewportProvider.jsx`

### Change image handling

Software's 14 transparent sticker masters, built-in image generation prompts and pair comparison page live in `public/images/stickers/software/`. `SoftwareProjectStickerLayer.jsx` owns their stable project-ID pairs and measured top-left/top-right placement; its SCSS styles only the independent overlay. Use `node npm/generate-responsive-images.js --directory=images/stickers/software` to refresh this collection without rebuilding unrelated responsive assets. Preserve the PNG masters and prompt provenance; cards consume generated WebP derivatives capped at 640px through `_imageUtils`.

Hardware collage sticker sources and the 16-direction comparison page live in `public/images/stickers/hardware-experiments/`. Their stable project-ID pairs, rotations, and measured placement are owned by `HardwareProjectStickerLayer.jsx`; its SCSS styles only the independent overlay and cutouts, without adding space to the cards or article. All stickers use 46.67% of their initial width and height; the curtain retains its additional half-size adjustment. The first generated concepts are installed; detailed edge/style refinement remains optional follow-up work. Keep their transparent PNG masters and regenerate the WebP derivatives rather than editing generated files. To refresh only this collection while preserving the rest of the responsive manifest, run `node npm/generate-responsive-images.js --directory=images/stickers/hardware-experiments`. Sticker derivatives are capped at 640px; the comparison page continues to use the full-resolution masters.

Main files:

- `src/components/layout/LayoutImageCache.jsx`
- `src/hooks/utils/_image-utils.js`
- `npm/generate-responsive-images.js`

### Change CV/resume generation

Main files:

- `npm/generate-machine-cv.js`
- `public/data/cv-machine.json`
- `public/data/profile.json`

## Generated Files

These files are outputs, not primary authoring surfaces:

- `public/generated/machine-cv-head.html`
- `public/generated/machine-cv-body.html`
- `public/cv/index.html`
- `public/resume.json`
- `src/data/generated/imageManifest.generated.js`
- `public/images/__responsive/**`

Rule:

- edit the source
- regenerate the output
- do not treat generated files as the main place to make content changes


## Home-specific content

Home uses route `#about` and `public/data/sections/home.json`. `SectionBody.jsx` places name origins then the human stack last. Some prose is component-owned: `ArticleNameOrigins.jsx` and popup copy in `ArticleStack.jsx`. Update all four locales. Inspect wrapper-generated IDs before editing ID-scoped selectors; raw and rendered article IDs can differ.

Image lifecycle behavior also lives in `ImageView.jsx` and `useImageStatus.js`. See [Home rendering](../architecture/home.md).
