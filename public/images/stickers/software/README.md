# Current Software stickers

This folder contains one shared set of 14 drawings, using the former dark-mode colours in both themes:

- `dark/`: the 14 shared SVG exports. The folder name identifies their origin, not a theme restriction.
- `manifest.json`: project mapping, design briefs and palette values.
- `index.html`: the comparison gallery at 40px, 104px and 256px.

Edit [the authoring generator](../../../../npm/generate-software-stickers.js), then run `node npm/generate-software-stickers.js` from the repository root. Use `--preview` for optional local artwork boards under `docs/tmp/software-stickers-v5/`.

The generator also writes the application artwork module and shared palette CSS. The app renders identical inline SVGs in both themes. No separate light artwork, theme override or colour filter is generated. These vectors do not need responsive WebP derivatives.

Historical artwork and generation provenance are preserved in [the archive](../../../../docs/archive/stickers/software/README.md), outside the published assets. Keep this folder free of superseded revisions and duplicate galleries.
