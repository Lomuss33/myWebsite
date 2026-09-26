# Home implementation and handoff

Verified: 2026-09-11 against source and recent focused checks. The Home design is accepted; preserve it while fixing concrete defects.

Route: `#about`. Data: [home.json](../../public/data/sections/home.json). Registry/order: [SectionBody.jsx](../../src/components/sections/SectionBody.jsx). Name origins precedes the human stack at the end.

| Area | Owner | Behavior |
|---|---|---|
| Contact band | `ArticleInlineList.jsx` | Full, compact address/number, short, icon labels; measured equal-width slots |
| Profile stack | `ArticleFeature.jsx` | Five images, no placeholder cards; click/Enter/Space cycles; spread uses available media space |
| Intro text | `PretextInteractiveText.jsx` | Measured animated lines; refresh typography on width changes |
| Skill proof | `ArticleInfoList.jsx` | Stable cards, in-card details, Escape dismissal, scroll for long text |
| Name origins | `ArticleNameOrigins.jsx/.scss` | Native paragraphs around animated names; narrow-screen stacking |
| Human stack | `ArticleStack.jsx` | Half-outside circles, neighbor clearance, distinct hover/pinned states |

## Constraints learned

- Ordinary wrapping overrides on animated measured lines caused overlap. Change measured width/font instead.
- Intro text must not resize to fill portrait height.
- `public/images/profile-placeholder.png` is the future-photo/error fallback. Stop retrying if that URL fails.
- Human-stack card widths must include outside-circle space; 100% width plus margin overlapped neighbors.
- Skill details must not expand the card/grid when opened; that alternative was rejected.
- Preserve accepted design during performance maintenance.

## Rendering reliability

[useImageStatus.js](../../src/hooks/useImageStatus.js) resets source status in a layout effect before child passive effects reconcile cached images. A later reset risks hiding a loaded image.

[Transitionable.jsx](../../src/components/capabilities/Transitionable.jsx) owns reveal timers locally with cleanup, so shared scheduler cancellation cannot strand invisible elements.

Idle Home floating frames release permanent 3D/will-change layers; active tilt remains. Intro faces do not require backface hiding. Weak-device disappearance still needs confirmation on the stakeholder's hardware.

## Handoff

No redesign is pending. All five cards have images: original main, `lovro-outdoors.webp`, original alternate, `ejajLovroMusicFinal.png`, and `ai_lovro_fifa26.png`. The placeholder remains only as an error fallback. Recent checks sampled four viewport/theme/language combinations, popup keyboard dismissal, cached reload/scroll visibility, and failed-placeholder loading. They were ad hoc checks, not a permanent full-device suite. See [known gaps](../guides/validation.md#known-gaps).

Description sizing update (2026-09-12): Home skill descriptions use natural height without nested scrolling, with slightly smaller mobile type. Proof-panel scrolling remains separate. Focused checks at 240, 390, and 768px found no overflowing visible descriptions.

Home heading update (2026-09-13): prefix and title each remain a single line. SectionHeader measures available width and reduces font size as needed after resizing, text changes, and font loading. Very narrow screens intentionally use smaller heading text.

Compact typography (2026-09-13): Home article headings use smaller bounded type and tighter margins below a 48rem content container. Name-origin body text is reduced in that range; narrow stacked display names are capped at 3.75rem. Wide layouts retain their existing scale.

Desktop density restoration (2026-09-26): after removing page-level CSS zoom, `src/styles/_home-hero.scss` applies a Home-only density scale for `normal` and `ultrawide` layouts. The welcome heading, intro column/image, skill-card type and spacing, name-origin displays, and human-stack tiles are each bounded at their component level; natural content height is retained. A narrow content-container fallback stacks the intro and name display even when a landscape phone resolves to desktop layout. Contact chips have a 36px visual surface inside their existing 44px control targets. These selectors exclude mobile and do not affect the navigation rail. Responsive checks sample 1366×768 and 3440×1440 for desktop density and 568×320 for the narrow landscape pane.

Image stack cycling follows neighboring slots (center, near right, far right, far left, near left), keeping the cross-stack wrap behind the foreground cards. Transitions honor reduced motion.

Further Home refinement (2026-09-26): an additional pass reduces the remaining oversized elements after the initial zoom-removal restoration: the welcome heading, contact chip visuals, intro portrait and copy, skill tiles, name displays/copy, human-stack cards, and article rhythm. It applies in normal/ultrawide layouts at viewports at least 50rem wide and 30rem tall. The page content height at 1366x768 fell from about 2440px to about 1975px in an English/dark Chromium sample, while 44px interactive targets remain. Mobile and short landscape layouts do not receive this additional reduction. This is a density adjustment rather than a promise of identical percentage scaling for every translation or viewport.

Mobile Home density update (2026-09-26): a separate `data-layout="mobile"` scale now compacts the welcome heading, article rhythm, contact-chip visuals, intro portrait/copy, skill cards, name-origin displays/copy, and human-stack tiles. It wraps the welcome title, stacks the intro below 36rem of content width, and caps display sizes on tall touch screens. Content keeps natural height and controls retain 44px hit areas. Focused checks cover 280x653, 320x568, 390x844, and 1440x2560; the rules do not modify the navigation shell.
