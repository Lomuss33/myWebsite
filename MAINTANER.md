# Maintainer Guide

Back to the main template guide: [README.md](./README.md)

User-facing behavior guide: [USER_GUIDE.md](./USER_GUIDE.md)

Note:

- the filename stays `MAINTANER.md` for compatibility with the existing repo links

## Purpose

This file is for people who maintain, extend, or adapt the template itself.

It is about:

- how the app is structured
- where to make content, style, and code changes
- how to add sections and article types
- what is generated
- what to validate before publishing

If you only want to customize content, start with [README.md](./README.md).

## What Maintainers Need To Know First

This repo is built around a simple idea:

- JSON defines the content
- React article components render the content
- providers manage app behavior
- SCSS controls the visual system

Most work should happen at the lowest layer that solves the problem:

- content problem: edit `public/data/*`
- styling problem: edit `src/styles/*`
- rendering problem: edit `src/components/articles/*`
- app behavior problem: edit `src/providers/*` or related hooks

Do not jump into framework changes when a content or style edit is enough.

## Commands

Core commands:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run cv:generate`
- `npm run images:generate`

Template/helper commands:

- `npm run resume:make:article <ArticleName>`
- `npm run resume:clear`

Important note:

- `resume:make:article` should be treated as scaffolding help, not a guaranteed complete registration flow
- the current article system uses lazy loaders in `src/components/sections/SectionBody.jsx`, so always verify manual integration

## Maintainer Priorities

When you inspect a task, default to this order:

1. can this be solved in `public/data/*`?
2. if not, can it be solved in `src/styles/*`?
3. if not, does an existing article component need adjustment?
4. only then consider provider or app-level behavior changes

This keeps template forks cheaper to maintain and easier to understand.

## Architecture Map

### Bootstrap

- `src/main.jsx`

Responsibilities:

- loads initial settings
- mounts the app
- applies environment classes
- assembles the provider stack

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
- responsive helpers
- user input state
- notifications and overlays
- theme state
- hash-based routing
- animated section transitions

### Rendering shell

- `src/components/Portfolio.jsx`
- `src/components/layout/*`
- `src/components/nav/*`
- `src/components/sections/*`

Responsibilities:

- overall shell
- navigation chrome
- slideshow/section switching
- section body rendering
- image preloading

### Content rendering

- `src/components/articles/*`

Responsibilities:

- convert normalized article/item data into visible content blocks

### Data normalization

- `src/hooks/models/ArticleDataWrapper.js`
- `src/hooks/models/ArticleItemDataWrapper.js`
- `src/hooks/parser.js`

Responsibilities:

- normalize raw section/article/item JSON
- provide derived properties
- tolerate some legacy schema inputs

## Content Sources

### Primary source files

- `public/data/settings.json`
- `public/data/profile.json`
- `public/data/strings.json`
- `public/data/categories.json`
- `public/data/sections.json`
- `public/data/sections/*.json`
- `public/data/cv-machine.json`

### What each one does

`settings.json`

- languages
- themes
- preloader
- feature toggles
- image cache hints
- developer flags

`profile.json`

- profile identity
- avatar and alternate avatar
- resume PDF path
- roles
- status
- pronunciation data

`categories.json`

- top-level navigation categories

`sections.json`

- section registry
- order
- category assignment
- icon mapping
- backing JSON paths

`sections/*.json`

- visible section content
- article definitions
- article items

`cv-machine.json`

- canonical structured CV source used by the CV generator

## Content Schema Rules

### Section contract

Each section should contain:

- `title.locales`
- `articles[]`

### Article contract

Each article should contain:

- `id`
- `component`
- `locales`
- `settings`
- `items`

`items` may be `null` for special form-like renderers, but most article types expect arrays.

### Item contract

Common item fields include:

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

### Category schema

Preferred schema:

- article `settings.categorize_by` should be an array of category ids
- item `categoryId` or `categoryIds` should hold the actual item categories

Legacy compatibility still exists for older `category`-style inputs, but new data should not introduce them.

## Existing Article Types

Current registered article types:

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

Good default choices for template users:

- `ArticleFeature`
- `ArticleInfoList`
- `ArticlePortfolio`
- `ArticleSkills`
- `ArticleText`
- `ArticleTimeline`

## Common Maintainer Tasks

### Add or reorder sections

1. Edit `public/data/sections.json`.
2. Add or update the related file in `public/data/sections/`.
3. Make sure the `categoryId` exists in `public/data/categories.json`.

### Add a new content card/item

1. Open the target section JSON file.
2. Find the relevant article.
3. Add a new item to `items`.
4. Keep the `id` unique inside that article.
5. Fill in only the fields that the renderer actually uses.

### Add a new article type

1. Create the component in `src/components/articles/`.
2. Add any SCSS file it needs.
3. Register a loader in `src/components/sections/SectionBody.jsx`.
4. Register the lazy component in `src/components/sections/SectionBody.jsx`.
5. Reference the new `component` name from section JSON.

### Change theme styling

Main files:

- `src/styles/themes/_variables-theme-dark.scss`
- `src/styles/themes/_variables-theme-light.scss`
- `src/styles/themes/_theme-variables-builder.scss`

Supporting layout/theme files:

- `src/styles/layout/*`
- `src/styles/_tokens.scss`
- `src/styles/app.scss`

### Change routing or section transitions

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

These files are outputs:

- `public/generated/machine-cv-head.html`
- `public/generated/machine-cv-body.html`
- `public/cv/index.html`
- `public/resume.json`
- `src/data/generated/imageManifest.generated.js`
- `public/images/__responsive/**`

Maintainer rule:

- edit the source
- regenerate the output
- avoid treating generated files as the main authoring surface

## Validation Checklist

For normal code or styling changes:

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
- run `npm run build` if the change touches paths, generated content, or unusual renderers

## Current Codebase Caveats

- the current Vite config uses `base: '/'`
- any older note that still says `/myWebsite/` is outdated
- `SectionBody.jsx` is the real article registry
- lazy loading is part of the current rendering strategy
- `my-software` and `my-hardware` intentionally defer some article rendering for performance
- `LayoutImageCache` affects perceived startup and preloader timing
- `ArticleWebArt.jsx` is custom and large; avoid touching it unless your task specifically needs it

## Suggested Maintainer Workflow

When making changes:

1. identify whether the task is content, style, renderer, or platform behavior
2. change the smallest correct layer
3. verify whether any generated outputs must be refreshed
4. validate with lint/build as needed
5. update docs if behavior or maintainer workflow changed

## Cheap Inspection Path

For most maintenance tasks, read these files before scanning the rest of the repo:

1. `package.json`
2. `README.md`
3. `public/data/sections.json`
4. `public/data/categories.json`
5. the target section JSON
6. `src/components/sections/SectionBody.jsx`
7. the specific renderer involved

## When To Update Which Doc

Update [README.md](./README.md) when:

- template setup changes
- file priorities change
- onboarding steps change
- the "how to copy this" workflow changes

Update [USER_GUIDE.md](./USER_GUIDE.md) when:

- visible UI behavior changes
- new visitor-facing controls appear
- navigation/contact/modal behavior changes

Update this file when:

- architecture changes
- extension workflow changes
- generator workflow changes
- maintainer caveats change
