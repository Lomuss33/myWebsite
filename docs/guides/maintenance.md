# Maintenance workflows

Verified: 2026-09-11 against commands and source locations. Code-span paths are repository-relative.

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
