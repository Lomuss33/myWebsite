# Software project sticker plan

Status: complete; all 14 transparent images saved and installed with responsive WebP derivatives and an independent Software overlay.

Last updated: 2026-10-04. Owner: portfolio maintainer with Codex.

## Objective and scope

Create 14 transparent 2D stickers for the seven projects in `public/data/sections/my-software.json`, article 1. Each card gets one top-left and one top-right sticker. Keep the accepted Hardware sizing and independent overlay approach, with fixed irregular positions and no added layout space. Hardware artwork and placement stay as implemented.

## Two contrasting styles

- Top-left: crisp flat vector-style illustration, bold clean contours, two or three solid colours, thin warm-white die-cut edge. Distinctive silhouettes, minimal internal detail.
- Top-right: two-colour risograph/editorial ink illustration, textured fills, hand-drawn contours and slight ink misregistration. Transparent silhouette with a restrained pale edge. Flat printed artwork, no 3D lighting or metallic material.

Both styles should remain readable at small display sizes. Colours vary by project, but the contour and print treatments remain coherent. Avoid long generated text; any exact lettering can be added after illustration generation.

## Proposed subjects

| Project ID | Top-left: flat graphic | Top-right: textured ink |
| --- | --- | --- |
| 1 GermanCro | Three interlocking speech/flashcard shapes, using German, English and Croatian colour accents | Compact keyboard/typing strip with correct-answer blocks and an insertion cursor; mint and navy |
| 2 Belot | Overlapping king and queen cards with matching suit, using the site's French-style suits | Four cards meeting at a central trick, suggesting the four-player table; forest green and brick red |
| 3 Pepper / Nao Poker | Recognisable Pepper silhouette with chest tablet showing a small card hand | Five-card hand with two selected cards and a curved draw arrow; cobalt and coral |
| 4 Villa Bagara | House-and-mountain silhouette inspired by its current welcome graphic; ochre roof and green land | Winding hiking route through topographic contours with a small sun; pine and terracotta |
| 5 HTML Family Tree | Branching portrait nodes that form a tree silhouette; olive and cream | Family connections gathered around a small keyhole, reflecting the encrypted archive; plum and muted green |
| 6 LaTeX CV | Clean typeset CV page with strong heading and neat columns; navy and warm white | Typesetting capital, baseline guides and pen nib; charcoal and burnt orange |
| 7 Portfolio Website | Miniature browser frame with portrait circle and colourful project tiles; cyan and gold | Winding timeline through three project nodes, with a small construction-tape corner; navy and gold |

The repository confirms Pepper tablet poker; the Nao part is not documented there. Draw the confirmed Pepper design without changing the existing project title. The LaTeX repository returned 404, so its concepts are based on this portfolio's project description and local resume material.

## Research

Inspected live pages for [GermanCro](https://germancro.live/), [Belot](https://lomuss33.github.io/AdioBella/), [Family Tree](https://lomuss33.github.io/HTML-FamilyTree/), [Villa Bagara](https://lomuss33.github.io/VillaBagara/), and [the portfolio](https://lovro-music.de/). Family Tree exposes an encrypted-archive entry screen; no private tree was unlocked. Consulted [GermanCro source](https://github.com/Lomuss33/GermanCro), [Belot source](https://github.com/Lomuss33/AdioBella), [Pepper Poker source](https://github.com/Lomuss33/Pepper-Poker), [Villa home content](https://raw.githubusercontent.com/Lomuss33/VillaBagara/main/public/data/sections/home.json), and [Family Tree source](https://github.com/Lomuss33/HTML-FamilyTree). Local owners: software section JSON, `public/resume.json`, `HardwareProjectStickerLayer.jsx` and its SCSS.

## Placement

Use the accepted Hardware size as the starting scale, approximately 55-90px at the annotated card width, then tune to the visible artwork bounds. Both stickers straddle the top corners. Keep opaque artwork close to the card edges and clear of centred title text; narrow cards may need smaller artwork rather than extra title padding.

Give each sticker fixed horizontal and vertical offsets and rotations of roughly 4-11 degrees. Alternate which side sits higher and which sits farther inward; do not randomise on reload, filtering or language changes. Use transparent cutouts with subtle CSS shape shadows.

Render the overlay directly at SectionContent level, above cards and decoration layers, ignoring pointer input and hidden from accessibility. Measure visible card rectangles, follow filtering/reflow/motion and remove filtered-out pairs. Do not add card padding, minimum heights, grid gaps or reserved corners. Do not cover navigation or add continuous idle animation.

## Production sequence

1. Generate all 14 separately with true transparency and preserve original images and prompts. Produce a labelled contact sheet to compare both styles across all seven pairs.
2. Inspect silhouettes, robot anatomy, playing-card symbols, edge halos and readability at intended size. Edit flawed assets and refine cutouts through image editing; retain original versions. Use manual exact lettering only where it helps.
3. Save final masters under a Software sticker asset directory and generate small responsive WebP derivatives through the existing image generator.
4. Add a Software overlay using the existing Hardware placement contract, with the different top-left/top-right anchors. Keep project mapping stable by ID. Tune positions without changing the underlying card layout.
5. Update canonical responsive and asset guidance once implemented. No builds, tests or lint runs per the user's standing instruction; report actual inspection scope.

## Completed implementation

User requested placement after the plan. All 14 assets were generated with built-in imagegen, inspected and saved in `public/images/stickers/software/`, alongside `prompts.json`, generation provenance in `manifest.json` and the pair comparison page `index.html`. No additional image edits were needed for the first installed set. The original generated files were retained.

`SoftwareProjectStickerLayer.jsx` and its SCSS provide the independent section-level overlay, anchored by `data-software-project-id` in `ArticlePortfolio.jsx`. Sticker width follows 16% of card width, bounded between 40px and 104px, with fixed rotations and separate horizontal/vertical offsets for all 14 placements. Card sizing, padding and grid spacing were not changed.

Ran only asset generation: `node npm/generate-responsive-images.js --directory=images/stickers/software`. It created 56 WebP derivatives and merged 14 entries into the existing responsive manifest, now 129 entries. Reviewed source and generated artwork; inspected PNG dimensions and transparent corner alpha. No build, lint, tests or browser layout checks were run, per the standing user instruction.

Current ownership and regeneration instructions are in `docs/architecture/responsive-layout.md` and `docs/guides/maintenance.md`. Further changes should use those canonical guides; this document records the completed plan and implementation.
