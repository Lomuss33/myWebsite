# Software project sticker plan

Status: complete revision 5 with one shared set; all 14 former dark-mode drawings and their palette are used in every theme. The user requested removal of the separate light set after folder cleanup. Accepted overlay placement stays unchanged.

Last updated: 2026-10-05. Owner: portfolio maintainer with Codex.

## Objective and scope

Create 14 transparent 2D stickers for the seven projects in `public/data/sections/my-software.json`, article 1. Each card gets one top-left and one top-right sticker. Keep the accepted Hardware sizing and independent overlay approach, with fixed irregular positions and no added layout space. Hardware artwork and placement stay as implemented.

## Current art direction

- Each drawing communicates a coherent object or action, with entirely new geometry, more expressive overlap/perspective and broad colour planes. Details support the main silhouette rather than building miniature scenes.
- The former dark palette is used unchanged in every theme. Inline SVGs inherit one shared colour rule for fills, gradient stops and outlines. The separate light palette, exports and theme overrides have been removed. No colour inversion, brightness/contrast filters, extra theme images or theme-observing JavaScript are used.

The current authoring source is `npm/generate-software-stickers.js`; briefs and shared palette values are in `public/images/stickers/software/manifest.json`. The `dark/` directory contains the single current export set, used in both themes. All 14 are custom vectors, preserving sharp edges when enlarged. Previous PNG and SVG revisions remain as [historical comparisons](../archive/stickers/software/README.md) outside public assets. Earlier paths, two-palette directions and commands below describe the implementation before the user's shared-set request.

## Current subjects and materials

| Project ID | Top-left concept | Top-right concept |
| --- | --- | --- |
| 1 GermanCro | Interlocking angled bubbles with bespoke German/Croatian glyphs | Headphones around a tilted practice tile |
| 2 Belot | Diagonal card hand with correctly drawn club suits | Angular club medallion with ribbon tails |
| 3 Pepper / Nao Poker | Three-quarter Pepper portrait with neck joint | Articulated two-joint arm dealing one card |
| 4 Villa Bagara | Architectural house in perspective | Asymmetric mountain range with winding path |
| 5 HTML Family Tree | Three people forming a branching family shape | Archive folder guarded by a keyhole shield |
| 6 LaTeX CV | Angled CV with a crossing fountain pen | Bespoke TeX type composition with lowered E |
| 7 Portfolio Website | Perspective browser canvas with large cursor | Perspective laptop with one code expression |

The repository confirms Pepper tablet poker; the Nao part is not documented there. Draw the confirmed Pepper design without changing the existing project title. The LaTeX repository returned 404, so its concepts are based on this portfolio's project description and local resume material.

## Research

Inspected live pages for [GermanCro](https://germancro.live/), [Belot](https://lomuss33.github.io/AdioBella/), [Family Tree](https://lomuss33.github.io/HTML-FamilyTree/), [Villa Bagara](https://lomuss33.github.io/VillaBagara/), and [the portfolio](https://lovro-music.de/). Family Tree exposes an encrypted-archive entry screen; no private tree was unlocked. Consulted [GermanCro source](https://github.com/Lomuss33/GermanCro), [Belot source](https://github.com/Lomuss33/AdioBella), [Pepper Poker source](https://github.com/Lomuss33/Pepper-Poker), [Villa home content](https://raw.githubusercontent.com/Lomuss33/VillaBagara/main/public/data/sections/home.json), and [Family Tree source](https://github.com/Lomuss33/HTML-FamilyTree). Local owners: software section JSON, `public/resume.json`, `HardwareProjectStickerLayer.jsx` and its SCSS.

## Placement

Use the accepted Hardware size as the starting scale, approximately 55-90px at the annotated card width, then tune to the visible artwork bounds. Both stickers straddle the top corners. Keep opaque artwork close to the card edges and clear of centred title text; narrow cards may need smaller artwork rather than extra title padding.

Give each sticker fixed horizontal and vertical offsets and rotations of roughly 4-11 degrees. Alternate which side sits higher and which sits farther inward; do not randomise on reload, filtering or language changes. Use transparent cutouts with subtle CSS shape shadows.

Render the overlay directly at SectionContent level, above cards and decoration layers, ignoring pointer input and hidden from accessibility. Measure visible card rectangles, follow filtering/reflow/motion and remove filtered-out pairs. Do not add card padding, minimum heights, grid gaps or reserved corners. Do not cover navigation or add continuous idle animation.

## Production sequence

1. Define one concept for each of the 14 drawings and author all geometry and palettes in `npm/generate-software-stickers.js`. Preserve previous revisions and their provenance outside the public folder.
2. Generate inline vector markup, palette CSS, standalone light/dark SVGs, the manifest and comparison gallery with `node npm/generate-software-stickers.js --preview`.
3. Visually inspect the local comparison boards at 40px, 104px and 256px on light/dark backgrounds. Refine the generator if needed; consume the vectors directly without responsive raster derivatives.
4. Map the vectors into the existing Software overlay by stable project ID. Preserve top-left/top-right anchors, size bounds, offsets, rotations and card geometry.
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

## Completed simpler vector revision

The user rejected revision 3's crowded stories and requested cleaner ideas that remain readable at small and large sizes in both themes. Redrew all 14 as custom SVG artwork, with one concept per sticker, broad fills, consistent graphite contours and cool slate outer rims. No built-in imagegen call was used for this revision; the generator is the editable artwork source. SVG geometry keeps symbols exact and edges sharp when enlarged.

Ran `node npm/generate-software-stickers.js --preview` to generate the 14 `clean-v4/*.svg` masters, design manifests, `index.html`/`index-clean-v4.html` and seven local comparison boards. Visually inspected every board, showing both drawings at 40px, 104px and 256px on representative light/dark backgrounds. Earlier PNGs, prompt provenance, versioned galleries and responsive derivatives remain intact.

Updated only the Software overlay's asset mapping and intrinsic vector dimensions, and replaced its large stacked shadows with one compact shape shadow per theme. Sticker size bounds, all rotations/offsets, section-level layering and zero layout spacing stay unchanged. Native SVGs bypass responsive raster generation through `_imageUtils`. Updated the canonical responsive and asset guidance. No build, lint, tests or browser layout checks were run, per the standing user instruction.

### Completed enamel and theme refinement

The user preferred the cleaner concepts and requested a little more polish plus an inexpensive theme solution. Added restrained enamel gradients, shaded cool rims and selected short glints in the artwork generator. Pepper's optical eyes have small reflections; no new subjects, scenes or tiny text were added. Existing silhouettes and placement are preserved.

The scoped image filters are `brightness(1.12) saturate(1.06) contrast(1.02)` in dark mode and `brightness(.97) saturate(1.08) contrast(1.08)` in light mode, followed by compact theme-specific shadows. This reuses the same SVGs, requires no extra image set or JavaScript theme listener and preserves the original colour identities. The generated gallery uses the same CSS presets; optional preview boards reproduce their filter order at each rendered size.

Regenerated all 14 SVGs, manifests and comparison artifacts through `node npm/generate-software-stickers.js --preview`. Visually inspected all seven boards at 40px, 104px and 256px on light and dark backgrounds. No build, lint, tests or browser layout checks were run.

## Completed ground-up composition revision

The user rejected the enamel/filter pass as doing too little. Created `npm/generate-software-stickers-v5.js` with 14 new drawings and separate authored light/dark palettes, without reusing the previous SVG path geometry. New compositions include intersecting language bubbles, listening practice, tilted playing cards, an angular game medallion, a three-quarter robot portrait, an articulated dealing arm, a house in perspective, a winding mountain path, a growing family, a guarded archive, a written CV, bespoke TeX type, a perspective browser and a laptop.

Ran `node npm/generate-software-stickers-v5.js --preview`. Visually inspected all seven paired boards at 40px, 104px and 256px in both palettes. Corrected a clipped edge in the diagonal card hand and the Croatian caron. Lightened the document/card/cursor material and strengthened CV rules to retain contrast in dark mode, then inspected those updated boards again.

The generator writes trusted artwork fragments to `src/data/generated/softwareStickerArt.generated.js` and palette variables to `softwareStickerPalettes.generated.css` beside the layer. `SoftwareProjectStickerLayer.jsx` renders these fragments as decorative inline SVGs. CSS inheritance changes actual SVG fill, stroke and gradient-stop colours with the application theme, without extra image fetches, a theme observer or brightness/saturation/contrast filters. Only compact shape shadows remain. Standalone palette-resolved SVGs and `index-modern-v5.html` support artwork review outside the application.

Project IDs, all rotations/offsets, 40–104px size bounds, independent section-level layering and zero added layout spacing stay unchanged. Earlier artwork and provenance are preserved. Updated canonical responsive/asset ownership guidance. Reviewed the source changes and generated artwork; no build, lint, tests or browser layout checks were run.

## Completed sticker-folder cleanup

On 2026-10-05, the user requested careful folder cleanup. Moved 243 superseded or redundant files to `docs/archive/stickers/software/`, including all 42 older PNG masters, 14 revision-4 SVGs, historical galleries/prompts/manifests, the old generator source and 168 unused WebP derivatives. All 272 moved files, including current exports and the generator rename, were verified against their original SHA256 hashes before any intentional regeneration or link edits. No artwork was deleted. Hardware file locations and URLs remain unchanged.

The public Software folder now contains only `light/`, `dark/`, `README.md`, `manifest.json` and `index.html`. Renamed the current version-5 generator to `npm/generate-software-stickers.js` and updated its output paths so regeneration maintains the stable structure. The old revision-4 generator is archived as non-executable text. Current export geometry and authored palettes are unchanged. Updated the archived duplicate version-5 gallery's relative paths; other historical gallery paths retain their previous structure.

Ran the current asset generator, then `node npm/generate-responsive-images.js --directory=images/stickers/software` to prune the 42 obsolete raster entries from the generated manifest, leaving 115 entries. A scoped asset audit confirmed identical current inline artwork, palette CSS payloads, both export sets, all Hardware sources/derivatives and all unrelated manifest entries. All 336 active/archive HTML asset references resolve. Canonical guidance and folder READMEs now describe current versus archived ownership. No build, lint, application tests or browser layout checks were run.

## Completed shared-set request

The user requested the current dark-mode stickers everywhere and removal of the light ones. Removed the light palette from the authoring source, the 14 light SVG exports and their empty folder, and both the colour and shadow theme overrides. The generator now emits only the unchanged dark set, one shared palette rule and a manifest with one `file` per sticker. The gallery and optional preview boards show this same set on both background colours. The archived duplicate version-5 gallery also points to the shared current set.

Regenerated assets through `node npm/generate-software-stickers.js`. Verified the retained dark exports and inline artwork against their original SHA256 hashes, and confirmed the shared palette rule equals the previous dark rule. Updated canonical guidance and folder READMEs. Placement, sizing and geometry are unchanged. No build, lint, application tests or browser layout checks were run.
