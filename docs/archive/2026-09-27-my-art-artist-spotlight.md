# My Art artist spotlight

- Status: complete
- Objective: Add a polished, reusable, currently unpopulated artist and latest-release feature above the existing Web Art article in My Art.
- Scope: `public/data/sections/my-art.json`, a dedicated article renderer and styles, article settings normalization, `SectionBody.jsx` registration, and the relevant article authoring guidance. Preserve unrelated working-tree edits.
- Owner: repository maintainer
- Last updated: 2026-09-27

## Masterplan

Build an editorial “artist listening room” rather than a plain Spotify embed:

- A wide artist banner frames a profile portrait, artist name, short introduction, and a prominent Spotify artist-page action. Optional external links can sit beside it.
- A latest-release feature pairs large cover artwork with track metadata and a vinyl record treatment. Its play control uses Spotify’s official embed playback, and the record animation follows actual playback state. No playback is attempted until the visitor activates it; respect reduced-motion settings.
- Keep the composition legible on narrow screens by stacking artist identity and release areas, with touch-sized controls, meaningful alt text, keyboard support, and no horizontal overflow.
- Add the article with empty content fields and graceful visual placeholders. Do not invent an artist, song, URLs, portrait, banner, or cover. With no Spotify track URI, the play control stays unavailable and no broken player is mounted.
- Keep all artist-specific content in section JSON and image assets in the repository’s authored image location. Reuse the site’s article wrapper, theme tokens, and responsive conventions.

## Findings and implementation decisions

- The existing target is `ArticleWebArt`; append the new entry to the data array to preserve positional article IDs, then place it immediately before the Web Art entry through the section's explicit CSS ordering.
- Article types are lazy registered in `src/components/sections/SectionBody.jsx`; a dedicated renderer avoids adding feature-specific behavior to unrelated articles.
- Use Spotify’s official iFrame Embed API for an opted-in track player; do not require the Web Playback SDK or account authorization for this showcase.
- The My Art section has hand-authored article order and extensive article-ID styling. Assign stable spotlight selectors/order and update the relevant selectors so inserting the article does not shift existing presentation unexpectedly.
- Existing working-tree edits predate this task. Keep the patch localized and do not reformat the full section JSON.

## Completion checklist

- [x] Implement the data-driven article and empty-ready visuals above Web Art.
- [x] Add responsive, theme-aware styling and accessible interaction states.
- [x] Update current maintenance guidance for the new article type/data fields.
- [x] Validate the edited JSON and inspect the focused diff; no tests were run.
- [x] Keep artist-specific fields empty for later population; archive this completed plan.

## Delivered and checked

- Added `ArticleArtistSpotlight`, section settings normalization, and lazy registration.
- Appended the article as positional article 6, then ordered it and its associated decorative band between the first artwork entry and Web Art. Existing article IDs remain stable.
- Artist, banner, links, release metadata, artwork, and Spotify identifiers remain blank; localized empty-state copy is present in English, German, Croatian, and Turkish.
- The Spotify iFrame Embed API controller is created only when a track identifier is populated. Playback begins from the visitor's play action; vinyl motion follows playback state and honors reduced motion.
- Follow-up visual refinement: the identity banner is compact, the native Spotify track embed is the main release view, and the clickable spinning record is a small accent alongside it.
- After the artist supplied media, the article uses optimized WebP banner, portrait, and cover assets plus a 192 kbps MP3 encoded from the supplied 24-bit WAV. The local player takes priority, starts at 84 seconds on first play, supports seeking through the full recording, and rotates the clickable cover disc during playback. The supplied Spotify artist link is shown; Spotify identifies that URL as Lovro Musić, while the requested card name remains Snopdan Dogovic.
- JSON parse check, focused ESLint, direct Vite production build, and `git diff --check` passed. The build emitted existing Sass deprecation and large-chunk warnings.

## References

- [Maintenance workflow](../guides/maintenance.md)
- [Responsive layout](../architecture/responsive-layout.md)
- [Spotify Embed creation](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed)
- [Spotify iFrame API](https://developer.spotify.com/documentation/embeds/tutorials/using-the-iframe-api)
