# myWebsite

A Vite + React portfolio template built around JSON content, reusable article components, multi-language support, themes, and machine-readable resume outputs.

This repo is both:

- my personal website
- a reusable portfolio/resume template that other people can copy and customize quickly

If you want to use it as a template, the important thing is this:

You do not need to rewrite the app. In most cases, you only replace the content in `public/data`, swap images, update branding, and keep the React system intact.

## Docs Map

- [README.md](./README.md): template overview, setup, and customization path
- [MAINTANER.md](./MAINTANER.md): maintainer and extension guide
- [USER_GUIDE.md](./USER_GUIDE.md): visitor-facing behavior guide

## What You Get

- single-page portfolio website
- section-based navigation
- desktop and mobile layouts
- dark/light themes
- multi-language support
- data-driven content from JSON
- reusable article blocks for timelines, projects, cards, feature sections, skills, forms, and more
- optional machine-readable CV/resume output
- responsive image generation
- custom interactive sections such as web art

## Built With

- Vite
- React 18
- SCSS
- Bootstrap + React Bootstrap
- Font Awesome + PrimeIcons
- Swiper
- Three.js
- Motion
- EmailJS
- Sharp

## Template Mindset

This project is designed so that:

- content lives mostly in JSON
- layout logic lives in reusable React components
- visual styling lives in SCSS
- advanced/interactive behavior is isolated in article components and providers

That means most people copying this repo only need to touch:

- `public/data/settings.json`
- `public/data/profile.json`
- `public/data/categories.json`
- `public/data/sections.json`
- `public/data/sections/*.json`
- `public/images/*`
- `public/resume.pdf`

## Quick Start

```bash
npm install
npm run dev
```

Other useful commands:

- `npm run build`
- `npm run preview`
- `npm run lint`
- `npm run cv:generate`
- `npm run images:generate`

## Use This As A Template

This repo is best used by copying the system and replacing the identity.

If you are cloning it for your own portfolio:

1. copy or fork the repo
2. run `npm install`
3. run `npm run dev`
4. replace your profile, sections, images, and resume
5. keep the React structure unless you actually need a new content block

That is the intended workflow.

## How The Website Is Made

At a high level, the system works like this:

1. `src/main.jsx` boots the app and loads `public/data/settings.json`
2. `DataProvider` loads global JSON data such as strings, profile, categories, and section definitions
3. each section from `public/data/sections.json` loads its own JSON file
4. `SectionBody.jsx` picks a React article component based on the JSON `component` name
5. article wrapper classes normalize raw JSON and feed clean data into the UI
6. providers handle language, theme, viewport, navigation, feedback, and routing behavior

In practice:

- JSON decides what appears
- React decides how it is rendered
- SCSS decides how it looks

## Project Structure

```text
src/
  components/
    articles/       reusable content block renderers
    layout/         shell and slideshow
    nav/            desktop/mobile navigation
    generic/        shared UI pieces
  providers/        app-wide behavior and state
  hooks/            parsing, utilities, wrappers
  styles/           SCSS tokens, themes, layout, overrides

public/
  data/             main content and configuration
  images/           source images and generated responsive images
  generated/        generated CV fragments
  cv/               generated CV page
  resume.pdf        downloadable resume

npm/
  generate-machine-cv.js
  generate-responsive-images.js
  npm-resume-new-article.js
  npm-resume-clear.js
```

## Copy This Template

If someone wants to reuse this repo, this is the shortest safe path:

1. Fork or copy the repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Replace personal data in `public/data/profile.json`.
5. Replace section content in `public/data/sections/*.json`.
6. Update section order in `public/data/sections.json`.
7. Replace categories in `public/data/categories.json` if needed.
8. Replace images in `public/images`.
9. Replace `public/resume.pdf`.
10. Run `npm run cv:generate` if CV/resume metadata should match the new identity.
11. Run `npm run images:generate` after replacing source images in responsive-managed folders.

### Fastest first-day replacement list

If you want the fastest possible first pass, replace these first:

- `public/data/profile.json`
- `public/data/sections/*.json`
- `public/data/categories.json`
- `public/images/*`
- `public/resume.pdf`

## Start Customizing Here

### 1. Global site settings

Edit `public/data/settings.json`.

This controls:

- supported languages
- supported themes
- default language
- default theme
- preloader behavior
- cursor behavior
- fullscreen toggle behavior
- image cache hints

### 2. Identity and profile

Edit `public/data/profile.json`.

This controls:

- name
- localized name display
- avatar image
- alternate avatar
- resume PDF URL
- roles
- availability badge
- pronunciation audio

### 3. Top-level navigation

Edit `public/data/categories.json`.

This controls:

- main navigation groups
- icons
- translated labels

### 4. Section order and routing

Edit `public/data/sections.json`.

This controls:

- which sections exist
- their order
- which category they belong to
- which JSON file backs each section
- the icon for each section

### 5. Actual page content

Edit `public/data/sections/*.json`.

This is where most of your real customization happens.

Each section file contains:

- section title translations
- article blocks
- content items inside those article blocks

## Content Model

Basic section shape:

```json
{
  "title": {
    "locales": {
      "en": {
        "title_short": "Home",
        "title_short_nav": "Home",
        "title_long_prefix": "Hello",
        "title_long": "Welcome to {{my website}}"
      }
    }
  },
  "articles": [
    {
      "id": 1,
      "component": "ArticleFeature",
      "locales": {},
      "settings": {},
      "items": []
    }
  ]
}
```

Basic article idea:

- `component` chooses the renderer
- `locales` contains translated strings
- `settings` configures the renderer
- `items` contains the visible content

Common item fields:

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
- `tags`
- `categoryId`

## Existing Article Types

The template already includes these content block types:

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

Most template users will mainly use:

- `ArticleFeature`
- `ArticleInfoList`
- `ArticlePortfolio`
- `ArticleSkills`
- `ArticleTimeline`
- `ArticleText`

## Which Files Matter Most For Template Users

High priority:

- `public/data/settings.json`
- `public/data/profile.json`
- `public/data/categories.json`
- `public/data/sections.json`
- `public/data/sections/*.json`

Medium priority:

- `src/styles/themes/*`
- `src/styles/layout/*`
- `public/images/*`
- `public/resume.pdf`

Low priority unless you are extending the template:

- `src/components/articles/*`
- `src/providers/*`
- `src/hooks/models/*`
- `src/components/generic/*`

## When You Need Code Changes

You probably do not need to touch React code if you are only:

- changing text
- swapping images
- adding projects
- changing timelines
- changing navigation labels
- changing the downloadable resume

You probably do need code changes if you want:

- a brand-new article layout
- a different navigation system
- new app behavior
- a different contact workflow
- a major visual redesign beyond theme and layout changes

## How To Add A New Section

1. Add a section entry to `public/data/sections.json`.
2. Point it to a new JSON file in `public/data/sections/`.
3. Assign it to a category from `public/data/categories.json`.
4. Add translated section titles.
5. Add one or more articles to the section.

## How To Add A New Project Card

Usually this means editing a section that uses `ArticlePortfolio`.

1. Open the target file in `public/data/sections/`.
2. Find the article with `component: "ArticlePortfolio"`.
3. Add a new object to its `items` array.
4. Fill in title, description, image, tags, links, previews, and dates.

## How To Add A New Timeline Entry

Usually this means editing a section that uses `ArticleTimeline`.

1. Open the target section JSON.
2. Find the `ArticleTimeline` article.
3. Add a new item.
4. Fill in dates, institution, location, title, body text, and tags.

## How To Change The Look

For most style changes:

- edit `src/styles/themes/_variables-theme-dark.scss`
- edit `src/styles/themes/_variables-theme-light.scss`
- edit shared theme logic in `src/styles/themes/_theme-variables-builder.scss`
- edit layout styles under `src/styles/layout/*`

If you only want a new identity, do not rewrite everything first. Change:

- colors
- profile images
- fonts already referenced by the site
- spacing and section styling

before touching architecture.

## Generated Files

These are generated or derived outputs:

- `public/generated/machine-cv-head.html`
- `public/generated/machine-cv-body.html`
- `public/cv/index.html`
- `public/resume.json`
- `src/data/generated/imageManifest.generated.js`
- `public/images/__responsive/**`

Treat them as outputs, not primary authoring files.

### CV generator

`npm/generate-machine-cv.js` builds:

- hidden machine-readable CV markup for the main page
- standalone CV page
- `resume.json`

Its main sources are:

- `public/data/cv-machine.json`
- `public/data/profile.json`
- project content pulled from section JSON files

### Responsive images

`npm/generate-responsive-images.js`:

- scans selected source image folders
- creates responsive WebP variants
- regenerates the image manifest used by the app

## Optional Features You Can Keep Or Remove

You can keep the template simple by leaving advanced features alone, or remove them if you do not need them.

Optional features include:

- multiple languages
- dark/light theme switching
- EmailJS contact form
- complaint form
- animated cursor behavior
- machine-readable CV generation
- responsive image generation
- interactive web-art section

If you want a simpler fork, remove features one by one instead of rewriting the entire app.

## Good GitHub Template Qualities In This Repo

This template is structured to be easy to copy because:

- content is separated from rendering
- most edits are plain JSON
- styling is centralized
- advanced features are isolated
- generated outputs are clearly distinguishable from source files

## Template Warnings

- this repo contains personal content and branding that you should replace fully before publishing your copy
- some older docs in the repo may describe earlier behavior; trust the current code and this README first
- `ArticleWebArt.jsx` is intentionally large and custom; most template users can ignore it
- `npm/npm-resume-new-article.js` is helpful scaffolding, but the article registry currently uses lazy loaders in `src/components/sections/SectionBody.jsx`, so verify any generated changes manually
- generated files may be committed in git; do not assume they are hand-edited

## Good First Customization Plan

If you are adopting this template, do this in order:

1. Replace profile data.
2. Replace resume PDF.
3. Replace top-level sections and categories.
4. Replace all section JSON content.
5. Replace images.
6. Update colors/themes.
7. Regenerate CV output.
8. Regenerate responsive images.
9. Run `npm run lint`.
10. Run `npm run build`.

## For AI Agents

If you are an AI assistant working on this repo, start here:

1. `package.json`
2. `README.md`
3. `public/data/sections.json`
4. `public/data/categories.json`
5. `public/data/profile.json`
6. the target file in `public/data/sections/`
7. `src/components/sections/SectionBody.jsx`

Rules:

- prefer JSON edits over React edits for content tasks
- ignore `dist/`, `node_modules/`, `tmp/`, and `test-results/` unless debugging
- avoid scanning `ArticleWebArt.jsx` unless the task touches the art section
- do not hand-edit generated outputs unless explicitly required

## Validation

Before publishing changes:

- `npm run lint`
- `npm run build`

Also run these when relevant:

- `npm run cv:generate`
- `npm run images:generate`

## Related Docs

- [MAINTANER.md](./MAINTANER.md) for maintainer notes
- [USER_GUIDE.md](./USER_GUIDE.md) for user-facing site behavior

If you copy this template, the intended workflow is simple:

Keep the system. Replace the data. Replace the assets. Adjust the styling. Extend React only when the existing article blocks are not enough.
