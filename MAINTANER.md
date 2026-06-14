# Maintainer Guide

Main overview: [README.md](./README.md)  
Visitor behavior and QA reference: [USER_GUIDE.md](./USER_GUIDE.md)

Note: the filename stays `MAINTANER.md` for compatibility with existing links.

## Purpose

This guide is for maintaining or extending the project itself.

Use it for:

- project structure
- source-of-truth files
- common maintenance tasks
- generated outputs
- validation steps

## Core Idea

The project is built around a simple split:

- `public/data/*` stores content and configuration
- `src/components/articles/*` renders section content
- `src/providers/*` handles app-level behavior
- `src/styles/*` controls theme and layout

Default rule: change the lowest layer that solves the problem.

- content change: edit `public/data/*`
- visual change: edit `src/styles/*`
- renderer change: edit `src/components/articles/*`
- app behavior change: edit providers or supporting hooks

## Commands

Core commands:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run cv:generate`
- `npm run images:generate`

Helper commands:

- `npm run resume:make:article <ArticleName>`
- `npm run resume:clear`

Notes:

- `resume:make:article` is scaffolding help, not a full registration workflow
- article registration is controlled in `src/components/sections/SectionBody.jsx`

## Architecture Map

### App bootstrap

- `src/main.jsx`

Responsibilities:

- loads initial settings
- mounts the app
- applies environment classes
- builds the provider stack

### Providers

- `src/providers/DataProvider.jsx`
- `src/providers/LanguageProvider.jsx`
- `src/providers/ViewportProvider.jsx`
- `src/providers/InputProvider.jsx`
- `src/providers/FeedbacksProvider.jsx`
- `src/providers/ThemeProvider.jsx`
- `src/providers/LocationProvider.jsx`
- `src/providers/NavigationProvider.jsx`

Responsibilities:

- data loading
- localization
- viewport and responsive state
- input state
- notifications and overlays
- theme selection
- hash-based routing
- section navigation

### Rendering shell

- `src/components/Portfolio.jsx`
- `src/components/layout/*`
- `src/components/nav/*`
- `src/components/sections/*`

Responsibilities:

- app shell
- navigation
- section switching
- section rendering
- image preloading

### Content rendering

- `src/components/articles/*`

Responsibilities:

- render normalized section/article/item data into visible content blocks

### Data normalization

- `src/hooks/parser.js`
- `src/hooks/models/ArticleDataWrapper.js`
- `src/hooks/models/ArticleItemDataWrapper.js`

Responsibilities:

- normalize raw JSON
- provide derived fields
- support some legacy input formats

## Source Files

Primary content and config files:

- `public/data/settings.json`
- `public/data/profile.json`
- `public/data/strings.json`
- `public/data/categories.json`
- `public/data/sections.json`
- `public/data/sections/*.json`
- `public/data/cv-machine.json`

What they do:

- `settings.json`: languages, themes, feature toggles, preloader, developer flags
- `profile.json`: identity, images, roles, resume path, status, pronunciation data
- `strings.json`: shared UI strings
- `categories.json`: top-level navigation categories
- `sections.json`: section registry, order, category mapping, JSON paths
- `sections/*.json`: visible section content
- `cv-machine.json`: canonical structured CV source used by the CV generator

## Content Rules

### Section shape

Each section should contain:

- `title.locales`
- `articles[]`

### Article shape

Each article should contain:

- `id`
- `component`
- `locales`
- `settings`
- `items`

`items` may be `null` for form-like renderers, but most article types expect arrays.

### Common item fields

- `id`
- `img`
- `imgAlt`
- `faIcon`
- `link`
- `preview`
- `date`
- `dateStart`
- `dateEnd`
- `locales.title`
- `locales.text`
- `categoryId`
- `categoryIds`

### Categories

Preferred schema:

- article `settings.categorize_by` should be an array of category ids
- items should use `categoryId` or `categoryIds`

Legacy `category` inputs still work in some places, but new data should not introduce them.

## Registered Article Types

- `ArticleCards`
- `ArticleComplaintForm`
- `ArticleContactForm`
- `ArticleDataProbe`
- `ArticleFeature`
- `ArticleFacts`
- `ArticleFallingWords`
- `ArticleInfoList`
- `ArticleInlineList`
- `ArticleManuscript`
- `ArticlePortfolio`
- `ArticleSkills`
- `ArticleStack`
- `ArticleTestimonials`
- `ArticleText`
- `ArticleThread`
- `ArticleTimeline`
- `ArticleWebArt`

Common default choices:

- `ArticleFeature`
- `ArticleInfoList`
- `ArticlePortfolio`
- `ArticleSkills`
- `ArticleText`
- `ArticleTimeline`

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

## Validation

For code or style changes:

1. `npm run lint`
2. `npm run build`

For CV-related changes:

1. `npm run cv:generate`
2. `npm run build`

For responsive image changes:

1. `npm run images:generate`
2. `npm run build`

For content-only changes:

- `npm run lint` is usually enough
- run `npm run build` if the change affects paths, generated outputs, or unusual renderers

## Current Caveats

- Vite currently uses `base: '/'`
- `SectionBody.jsx` is the article registry
- lazy loading is part of the rendering strategy
- `my-software` and `my-hardware` intentionally defer some article rendering for performance
- `LayoutImageCache` affects startup and preloader timing
- `ArticleWebArt.jsx` is large and custom; avoid changing it unless required

## Suggested Workflow

1. identify whether the task is content, style, renderer, or app behavior
2. change the smallest correct layer
3. regenerate outputs if needed
4. run the appropriate validation steps
5. update docs if the workflow or behavior changed

## Fast Inspection Path

For most maintenance tasks, these files provide enough context:

1. `package.json`
2. `README.md`
3. `public/data/sections.json`
4. `public/data/categories.json`
5. the target section JSON
6. `src/components/sections/SectionBody.jsx`
7. the specific renderer involved
