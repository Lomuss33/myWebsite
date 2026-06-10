# myWebsite

**A custom React/Vite personal portfolio and resume platform with JSON-driven content, reusable components, theme/language support, automation scripts, and GitHub Pages deployment.**

This repo is both:

- my personal website
- a reusable portfolio/resume template others can adapt

## ✨ Quick Look

- JSON-driven content in `public/data/*`
- reusable React article components
- dark/light theme support
- multi-language support
- downloadable resume + machine-readable CV output
- responsive image generation script
- GitHub Pages deployment workflow
- custom interactive sections, including web art

## 👀 What It Is

This is not a static one-page profile.

It is a small frontend platform for presenting:

- profile and resume data
- projects and timelines
- skills and contact info
- media, writing, and custom interactive sections

Most content changes happen in JSON. Most UI behavior lives in reusable React components and providers.

## 🚀 Feature Highlights

- **Content model:** sections, articles, and items are driven by JSON
- **Reusable UI:** multiple article renderers for portfolio cards, timelines, feature blocks, forms, skills, text, and more
- **Presentation controls:** language switching, theme switching, desktop/mobile layouts
- **Automation:** CV generation, responsive image generation, i18n text validation
- **Deployment:** GitHub Actions workflow for GitHub Pages

## 🧱 Tech Stack

- **Frontend:** React 18, Vite
- **Styling:** SCSS, Bootstrap, React Bootstrap
- **UI / motion / media:** Font Awesome, PrimeIcons, Motion, Swiper, Three.js
- **Utilities:** Sharp, EmailJS
- **Deployment:** GitHub Pages via GitHub Actions

## 🗂️ How It Works

Short version:

1. `src/main.jsx` boots the app and loads settings
2. `DataProvider` loads content from `public/data/*`
3. each section points to its own JSON file
4. `SectionBody.jsx` selects the matching React article component
5. providers handle language, theme, viewport, navigation, and feedback

In practice:

- **JSON** decides what appears
- **React components** decide how it renders
- **SCSS** decides how it looks

## 🧭 Sections

- **Home:** intro, profile, identity, and first-contact overview
- **Experience:** work history, timelines, and professional background
- **Education:** academic path, training, and supporting credentials
- **Software:** coding and web/software-related projects
- **Hardware:** homelab, embedded, automation, and hardware-focused work
- **Writing:** written content, language-related material, and text-based sections
- **Art:** visual work, galleries, and custom interactive web-art pieces
- **Contact:** direct links, resume actions, contact form, and other ways to reach me

## ⚡ Quick Start

```bash
npm install
npm run dev
```

Useful commands:

```bash
npm run build
npm run preview
npm run lint
npm run cv:generate
npm run images:generate
```

## 📁 Repo Map

```text
src/
  components/   reusable UI and article renderers
  providers/    app-wide state and behavior
  hooks/        parsing, wrappers, utilities
  styles/       SCSS tokens, themes, layout

public/
  data/         portfolio content and config
  images/       source and responsive assets
  generated/    generated CV fragments
  cv/           generated CV page
```

## 📚 Deeper Docs

- [MAINTANER.md](./MAINTANER.md) for maintainer notes and extension workflow
- [USER_GUIDE.md](./USER_GUIDE.md) for visitor-facing behavior and QA checks

## 🔗 Related Files

- [README.md](./README.md)
- [MAINTANER.md](./MAINTANER.md)
- [USER_GUIDE.md](./USER_GUIDE.md)

If you want the full template details, customization path, and maintenance notes, use the linked docs above. This README is intentionally the short version.
