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

## 🖼️ Demo

Live site: `https://lovro-music.de/`

Suggested screenshots to add here:

- `![Home screen](./docs/screenshots/home-placeholder.png)`
- `![Projects section](./docs/screenshots/projects-placeholder.png)`
- `![Mobile layout](./docs/screenshots/mobile-placeholder.png)`
- `![Resume / CV view](./docs/screenshots/resume-placeholder.png)`

If screenshots are not added yet, this section is the first thing worth improving for GitHub presentation.

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

## 💼 Recruiter / Interviewer Note

This project is best read as a **frontend architecture + presentation system** rather than a full-stack app.

What it clearly shows:

- React component architecture
- configuration-driven UI
- localization and theming
- frontend tooling and deployment automation

What it does **not** try to claim:

- backend/database work
- high automated test coverage
- production-grade security
- enterprise-scale complexity

## 🛣️ Roadmap

- add real screenshots/GIFs to this README
- improve repo polish and reduce generated clutter
- add automated tests for core parsing/rendering flows
- tighten project case studies for the strongest portfolio pieces

## 🔗 Related Files

- [README.md](./README.md)
- [MAINTANER.md](./MAINTANER.md)
- [USER_GUIDE.md](./USER_GUIDE.md)

If you want the full template details, customization path, and maintenance notes, use the linked docs above. This README is intentionally the short version.
