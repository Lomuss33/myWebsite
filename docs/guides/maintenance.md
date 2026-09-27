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

### Add a new article type

1. Create the component in `src/components/articles/`.
2. Add its SCSS if needed.
3. Register the loader in `src/components/sections/SectionBody.jsx`.
4. Register the lazy component in `src/components/sections/SectionBody.jsx`.
5. Reference the new `component` name from section JSON.

For `ArticleArtistSpotlight`, put profile, banner, links, and latest-release fields in `settings.artist_spotlight`. Keep user-facing labels localized under that setting's `labels` object. Images use authored paths under `public/images/`. Set `latestRelease.audioSrc` and `startOffsetSeconds` for a local song; its first play begins at that offset, and the seek bar can reach the full recording. A Spotify track URI or URL remains an optional embedded-player source when no local audio is set. The artist portrait and centered Spotify action both link to the artist profile; the action sits between two vertical dividers on wide cards and moves to its own centered row when the card narrows. Artist names wrap instead of truncating. Place new My Art entries with the section's explicit article ordering in `SectionContent.scss` so existing generated article IDs remain stable.

`ArticleWebArt` uses `settings.web_art_presentation: "carousel"` for its layered card gallery. `LayeredCardCarousel` owns the deck, swipe navigation, immediate previous/next side cards (left is −1, right is +1, both wrap), numbered visit trail, and adaptive window layout; `ArticleWebArt` owns the artwork engines and the list of up to three pinned extras. Pinning advances to the next card and keeps the pinned work live. Where supported, the View Transitions API animates cards between single and simultaneous views; the static layout remains available in other browsers and for reduced-motion users. The numbered index includes every authored and ambient work plus Send Yours, fills balanced rows with square buttons and no scrollbar, and supports Left/Right and Home/End keys from its single tab stop. Gallery chrome follows the active light/dark theme. The closed gallery folds edge-on at 90 degrees, is transparent, and reserves only a 1px stage. Set the presentation to `"grid"` to restore the previous multi-card gallery without changing the artwork implementations.

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
