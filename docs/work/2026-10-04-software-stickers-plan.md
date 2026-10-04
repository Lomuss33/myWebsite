# Software project sticker plan

Status: complete revision 3; all 14 newly generated storytelling illustrations are installed. The user rejected revision 2 as mainly recolouring the old drawings. Revision 3 uses new compositions, richer project-specific details, varied editorial illustration approaches and contrast designed for both supplied light/dark themes. Accepted overlay placement stays unchanged.

Last updated: 2026-10-04. Owner: portfolio maintainer with Codex.

## Objective and scope

Create 14 transparent 2D stickers for the seven projects in `public/data/sections/my-software.json`, article 1. Each card gets one top-left and one top-right sticker. Keep the accepted Hardware sizing and independent overlay approach, with fixed irregular positions and no added layout space. Hardware artwork and placement stay as implemented.

## Current art direction

- Each pair now tells two different parts of its project's story, using new gestures, object arrangements and meaningful scene details. Styles vary across character, architectural, technical, typographic and layered digital editorial illustration.
- The same PNG serves both themes: medium-value opaque surfaces, charcoal contours and narrow cool silver-blue rim details retain edges against the supplied pale blush/peach and dark navy/rust surfaces. Teal, berry, cobalt, plum and coral accents vary with the scene rather than uniformly recolouring everything.

The user rejected revision 2 as retaining the drawings and mainly changing colour. Revision 3 generates all 14 compositions from scratch, without the previous illustrations as inputs. Fine scene detail supports clear dominant silhouettes at the accepted small sticker sizes. Paper-style carriers, cream frames, distressed grain and diffuse neon glow are excluded. The complete per-image briefs are in `public/images/stickers/software/prompts-story-v3.json`; `story-art-direction-v3.md` records the story and dual-theme contrast requirements. Targeted edits refine only these new illustrations' symbols, materials and framing.

## Current subjects and materials

| Project ID | Top-left story | Top-right story |
| --- | --- | --- |
| 1 GermanCro | Two learners communicate through a translation interface, with DE/HR/EN vocabulary tiles | Listening, typing and completed exercises on a practice device |
| 2 Belot | A player's hand and central trick at a four-seat game table | Rules engine sends ordered state into the browser game |
| 3 Pepper / Nao Poker | Pepper presents a card to a player's hand, mirrored on the display | Robot wrist, card replacement and monitor share a timing loop |
| 4 Villa Bagara | Exposed heritage masonry transitions into a planned mountain retreat | Hiking boot, route map, house and summit connect outdoor activity to the retreat |
| 5 HTML Family Tree | Selecting one portrait reveals linked generations | An opening secure archive releases connected family memories |
| 6 LaTeX CV | Text sections align into a measured CV grid, with a quick-scan clock | Source syntax flows through a typesetting mechanism into structured output |
| 7 Portfolio Website | Browser joins hardware, code and art projects in one interactive world | Learning, a technical workshop and a live web project form a continuous journey |

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

## First installed set

User requested placement after the plan. All 14 assets were generated with built-in imagegen, inspected and saved in `public/images/stickers/software/`, alongside `prompts.json`, generation provenance in `manifest.json` and the pair comparison page `index.html`. No additional image edits were needed for the first installed set. The original generated files were retained.

`SoftwareProjectStickerLayer.jsx` and its SCSS provide the independent section-level overlay, anchored by `data-software-project-id` in `ArticlePortfolio.jsx`. Sticker width follows 16% of card width, bounded between 40px and 104px, with fixed rotations and separate horizontal/vertical offsets for all 14 placements. Card sizing, padding and grid spacing were not changed.

Ran only asset generation: `node npm/generate-responsive-images.js --directory=images/stickers/software`. It created 56 WebP derivatives and merged 14 entries into the existing responsive manifest, now 129 entries. Reviewed source and generated artwork; inspected PNG dimensions and transparent corner alpha. No build, lint, tests or browser layout checks were run, per the standing user instruction.

Current ownership and regeneration instructions are in `docs/architecture/responsive-layout.md` and `docs/guides/maintenance.md`. Further changes should use those canonical guides; this document records the completed plan and implementation.

## Completed techno/neon revision

Edited every accepted PNG separately with built-in imagegen and true alpha transparency. Each of the 14 edit prompts defines its subject, exact object counts, geometry, palette, surface treatment and negative spaces. The full briefs are in `public/images/stickers/software/prompts-neon-v2.json`, with the shared specification in `neon-art-direction.md`.

The active masters are `*-neon-v2.png`, all 1254 × 1254px. The current `manifest.json` and versioned `manifest-neon-v2.json` retain input filenames and generated output paths. `index.html` and `index-neon-v2.html` display the revised seven pairs. The original PNGs and generated files remain intact, alongside `manifest-v1.json` and `index-v1.html` for comparison.

Only the 14 image filenames changed in `SoftwareProjectStickerLayer.jsx`. Sizes, rotations, offsets, independent section-level positioning and all card geometry remain accepted. No layout space was added and Hardware stickers were not altered.

Inspected all generated artwork and PNG transparency metadata. Ran only the asset generator, `node npm/generate-responsive-images.js --directory=images/stickers/software`, which rebuilt the collection's 112 responsive WebP derivatives for the 28 retained/current masters and merged the manifest to 143 entries. No build, lint, tests or browser layout checks were run, as requested.

## Completed new storytelling revision

Generated 14 entirely new compositions with built-in imagegen; prior revision artwork was not passed as generation input. The supplied screenshots informed light/dark palette and silhouette contrast requirements. Each pair now describes different project actions and relationships rather than repeating generic icon subjects.

Inspected all generated illustrations. Eleven targeted image edits corrected language codes, simplified inconsistent miniature card symbols, refined robot framing, removed cream from archive/document materials and adjusted illustrative profile content. These are refinements of the new scenes, not recolours of the rejected revision. The complete generation briefs are in `prompts-story-v3.json`; all follow-up prompts and output paths are saved in `refinements-story-v3.json` and `manifest-story-v3.json`.

All active `*-story-v3.png` masters are 1254 × 1254px with true alpha transparency. The current `manifest.json` selects the final outputs and retains original generation paths; earlier PNGs and manifests are preserved. `index.html`/`index-story-v3.html` show each identical image on representative pale blush/peach and dark rust surfaces. This gallery is an artwork comparison artifact, not evidence of browser/app testing.

Replaced only the 14 filenames in `SoftwareProjectStickerLayer.jsx`; sizes, rotations, offsets, absolute section-level layering and zero layout spacing stay unchanged. Regenerated the Software image collection through `node npm/generate-responsive-images.js --directory=images/stickers/software`: 168 WebP derivatives for 42 retained/current masters, responsive manifest now 157 entries. Reviewed generated images and PNG dimension/corner-alpha metadata. No build, lint, tests or browser layout checks were run, as requested.
