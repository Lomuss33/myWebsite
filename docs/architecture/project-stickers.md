# Project stickers

Feature ID: `project-stickers`. Search names: cutouts, corner artwork, overlapping stickers, top right, bottom left, software dark set.
Purpose and routes: decorative pairs follow project cards on `#my-hardware` and `#my-software`, without changing card layout or blocking controls.

Verified: 2026-10-06 by review of layer configuration, placement equations, styles, section mounting and the Software generator. No new browser/asset-generation checks were run. Previous Software size inspections and asset-hash cleanup are recorded in the [implementation record](../work/2026-10-04-software-stickers-plan.md); physical-device layout is not newly certified.

## Accepted behavior

- Both overlays mount directly under `.section-content`, above article/decoration layers, with `pointer-events: none`. Keep card clipping intact. Stickers may overlap card edges and existing gaps, but contribute no padding, reserved corners, minimum height, grid spacing or other layout footprint.
- Follow stable project ID anchors through filtering, lazy reveal, language changes and hover/reveal transforms. Use resize/mutation observations and short motion-following frame loops, not a permanent measurement loop. Visibility follows the cards' reveal opacity.
- Placement uses fixed project-specific rotations/offsets for a slightly uneven appearance. Do not randomize on reload/filtering. Clamp artwork inside section width while allowing overlap at card edges.
- Hardware: eight projects, two raster cutouts each at top-right/bottom-left. Sizes are 46.67% of initial placement; project 8's top-right curtain retains another half-size factor. Top-right artwork starts 15% of its height above the card top; bottom-left artwork ends 10% of its height above the card bottom. Horizontal variation is proportional to sticker width.
- Software: seven projects, two transparent vector compositions each at top-left/top-right. Width is 16% of the card, clamped to 40–104px. **Use the former dark artwork and shared palette unchanged in every theme.** No separate light set, theme palette overrides or theme-dependent shadows. Revision 5 contains 14 compositions.

## Ownership and dependencies

| Owner | Role / start here for |
|---|---|
| [SectionContent.jsx](../../src/components/sections/SectionContent.jsx) | Mounts overlays outside clipped article/card wrappers |
| [ArticlePortfolio.jsx](../../src/components/articles/ArticlePortfolio.jsx) | Stable project anchors, filtering and card structure |
| [HardwareProjectStickerLayer.jsx](../../src/components/sections/decorations/hardware/HardwareProjectStickerLayer.jsx), [styles](../../src/components/sections/decorations/hardware/HardwareProjectStickerLayer.scss) | Hardware mapping, measured corners, size exceptions, offsets and shadows |
| [Hardware cutouts](../../public/images/stickers/hardware-experiments/) | Current transparent bitmap assets; edit artwork before replacing these, not with palette-only CSS changes |
| [SoftwareProjectStickerLayer.jsx](../../src/components/sections/decorations/software/SoftwareProjectStickerLayer.jsx), [styles](../../src/components/sections/decorations/software/SoftwareProjectStickerLayer.scss) | Software anchors, measured size, transform tracking and shared shadow |
| [generate-software-stickers.js](../../npm/generate-software-stickers.js) | Software artwork/palette authoring source; regenerate instead of editing outputs |
| [softwareStickerArt.generated.js](../../src/data/generated/softwareStickerArt.generated.js), [generated palette](../../src/components/sections/decorations/software/softwareStickerPalettes.generated.css), [Software exports](../../public/images/stickers/software/) | Trusted inline vector markup, shared CSS and one exported `dark/` set with root gallery/manifest |
| [Asset maintenance](../guides/maintenance.md#change-image-handling), [historical Software artwork](../archive/stickers/software/README.md) | Generation/cleanup workflow and unpublished revisions |

Generated Software geometry, colours and export ownership stay in the generator; placement stays in its layer. Historical revisions belong outside public assets. No proposal to restore a light collection is accepted.

## Focused verification

1. Compare card/grid geometry with the overlay shown/hidden; expect identical spacing and dimensions, and usable links/buttons beneath artwork.
2. Filter categories, switch language, reveal lazy cards and hover; expect two correctly anchored stickers per visible project and none left floating for removed cards.
3. Resize tiny/ordinary phone and wide desktop views; expect bounded sizes, section containment and limited text overlap. Preserve the curtain exception.
4. Switch themes; Software geometry, colour and shadow must remain the same. Inspect vector clarity at 40px, 104px and a large preview if artwork changes.
5. After regenerating Software art, inspect all 14 exports, gallery/manifest and inline/CSS references. Ensure historical or light-set files do not reappear under public assets.
