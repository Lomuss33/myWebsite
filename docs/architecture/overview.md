# Architecture and content model

Verified: 2026-09-11 against source ownership and registry. Code-span paths are repository-relative.

[Documentation index](../README.md)

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

## Article registry

Use [SectionBody.jsx](../../src/components/sections/SectionBody.jsx) for supported types rather than a duplicate list.
