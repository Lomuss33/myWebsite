# Responsive layout

Verified: 2026-09-26 against resolver, navigation, timeline sizing, and Contact form sources; not exhaustive device testing.

## Mode authority

[responsiveLayout.js](../../src/config/responsiveLayout.js) reads viewport dimensions/root font size and publishes `html[data-layout]`.

| Mode | Rule, in order |
|---|---|
| mobile | Width less than height |
| ultrawide | Otherwise width at least 90rem and width/height at least 2.1 |
| normal | Everything else, including square windows |

Do not introduce independent width-only mobile fallbacks. Container breakpoints may rearrange individual components. Visual viewport keyboard clearance is separate. Update the resolver and boundary tests together.

## Desktop density

[LayoutNavigation.scss](../../src/components/layout/LayoutNavigation.scss) gives the desktop page a true 72rem maximum width and centers it in the space beside the navigation rail. It uses normal CSS layout with no global `zoom`, transformed page, or inverse-width compensation. The surrounding shell continues to show the garden/sky background on wide displays. Shared desktop spacing and typography are expressed through the bounded desktop tokens in [_sizing.scss](../../src/styles/_sizing.scss); interactive targets retain their actual 44px minimum. Mobile layout is unchanged.

Page-specific density is owned by each page's styles after the shared shell scale. Home's post-zoom desktop scale is scoped to `normal` and `ultrawide` in [_home-hero.scss](../../src/styles/_home-hero.scss); Experience, Education, Software, Hardware, Writings, Art, and Contact have similarly scoped rules in [_experience-density.scss](../../src/styles/_experience-density.scss), [_education-density.scss](../../src/styles/_education-density.scss), [_software-density.scss](../../src/styles/_software-density.scss), [_hardware-density.scss](../../src/styles/_hardware-density.scss), [_writings-density.scss](../../src/styles/_writings-density.scss), [_art-density.scss](../../src/styles/_art-density.scss), and [_contact-density.scss](../../src/styles/_contact-density.scss). Do not compensate by shrinking the centered 72rem pane or the navigation rail.

## Styling ownership

- [app.scss](../../src/styles/app.scss): imports and cascade order.
- [_sizing.scss](../../src/styles/_sizing.scss): shared responsive overrides.
- [_mobile-profile.scss](../../src/styles/_mobile-profile.scss): mobile profile.
- [_home-hero.scss](../../src/styles/_home-hero.scss): multiple Home article overrides and reliability safeguards despite its narrow filename.
- [_experience-density.scss](../../src/styles/_experience-density.scss), [_education-density.scss](../../src/styles/_education-density.scss), [_software-density.scss](../../src/styles/_software-density.scss), [_hardware-density.scss](../../src/styles/_hardware-density.scss), [_writings-density.scss](../../src/styles/_writings-density.scss), [_art-density.scss](../../src/styles/_art-density.scss), and [_contact-density.scss](../../src/styles/_contact-density.scss): page-specific desktop density after zoom removal.
- [useSidebarProfileLayout.js](../../src/components/nav/useSidebarProfileLayout.js): rail-space fit; navigation takes priority over optional profile content.
- [_profile-fit.scss](../../src/components/nav/partials/_profile-fit.scss): profile states.

Inspect computed styles before adding rules. Component SCSS and later overrides coexist. Consolidation should preserve behavior and be a separate change. Measure actual rendered geometry at the final page width and at browser zoom levels.

## Current sizing contract

`src/styles/_sizing.scss` owns shared responsive tokens and the coarse-pointer and large-mobile overrides. The profile component consumes `--mobile-profile-row-max`, `--mobile-profile-grid-columns`, `--mobile-profile-gutter`, and `--mobile-profile-column-gap` from `src/styles/_mobile-profile.scss`. Navigation bands consume `--nav-tabs-height` and `--nav-pills-height`; labels, icons, and gaps use `--mobile-nav-item-*` tokens, with mobile defaults in `_root-flags.scss`.

For mobile composition at widths of 90rem and above, one media block in `_sizing.scss` sets those tokens from viewport width/height ratios with bounded `clamp()` values. It also removes the wrapper/content width caps and provides section clearance. The coarse-pointer size tokens are defined before this block, so large-mobile sizing wins when both conditions match. Do not add another large-mobile patch block; update these tokens and their component consumers instead. Height-based short-screen rules still take precedence for compact navigation.

### Navigation icons, labels, and controls

Mobile pill navigation gives two destinations equal grid columns regardless of label length; bars with more destinations retain minimum-width buttons and horizontal scrolling. The fixed pill wrapper does not force 3D compositing, avoiding wide-surface seams in its decorative edge stripe.

The mobile tab and pill bars share the `--mobile-nav-item-*` scale. Their band height follows `10svh` between 3.25rem and 7rem; icons and spacing scale with viewport height, and labels scale against both viewport height and nav width. At mobile widths of 60rem and above, the profile header, identity row, and both nav bars remove their 60rem/52rem caps and use the full available width, including tall portrait tablets that remain below the separate 90rem large-mobile geometry breakpoint. The profile name, portrait, and action discs scale against both card width and viewport height. The avatar switch is a square, non-shrinking box sized by the shared avatar token; mobile corner radius also scales with card width. Standard mobile action discs cap at 3.5rem with artwork bounded to 1.625rem. Wide mobile cards (40rem and above) raise the disc ceiling to 5.5rem and artwork to 2.5rem, still bounded by viewport height; pairs become horizontal at 60rem. On wide mobile cards, the audio button's near-edge SVG ring fills its button bounds so its hover animation follows the actual control edge. Below 26rem, discs scale down with card width. Below 24rem, the card switches to two rows before paired controls exceed their side tracks: each pair sits beneath its corresponding name, while the portrait spans the center column. The card can grow to fit this composition instead of clipping it at the one-row height. Below 18rem, control discs and artwork scale further to the row width, and the role strip reduces its height, padding, and type size. Coarse-pointer sizing no longer overrides those card-width rules. The profile header assigns spare height to the identity row rather than stretching the thin role band. The mobile resume popover uses content width between 9rem and 12rem, constrained by the visual viewport; its menu actions retain 44px touch rows. The mobile identity card reserves `20svh` between 5.5rem and 20rem; short-height layouts reduce the profile share to `14svh` bounded from 4.5rem to 6rem, use a 3.25rem navigation band, and switch nav controls to inline icon/label rows. At widths below 18rem the labels are visually clipped but stay in the accessibility tree; pill navigation can scroll horizontally when its destinations cannot fit. Sidebar link density is calculated from available row height in `NavLinkList.jsx`; extended links retain a 44px minimum, and on short viewports their region can scroll separately from profile/tools. Extended and short-rail tool bands cap at 8rem to prevent very tall screens from producing oversized controls.

[Validation limits](../guides/validation.md#known-gaps) include keyboards, safe areas, browser zoom, and weak GPUs. Archived measurements do not certify the current tree.

## Avatar contact card

Updated 2026-09-13: clicking the profile portrait in the extended rail, short rail, or mobile header opens `ProfileContactDialog`. The native modal dialog is portaled to `document.body` so it remains centered and outside page clipping and stacking contexts. The backdrop is 10% black without blur. The card compacts at short viewport heights, then scales to the available visual viewport when needed so all content stays visible without scrolling. Resize observation also refits translated content. The inactivity timer has no visible explanatory message. Outside clicks, Escape, the close button, and profile/social links dismiss it; seven seconds without interaction also dismisses it. Clicks inside and keyboard activity restart the timer. Native modal focus containment and focus restoration support keyboard use. Contact details and translated labels live in `public/data/profile.json`; Gravatar serves the supplied portrait, cover, and social icons. The existing randomized initial avatar and frame hover effects remain; avatar clicks now open contact details instead of switching portraits.

See `tests/profile-contact.spec.js` for positioning, dismissal, and inactivity checks.

## Mobile profile sizing

Updated 2026-09-12: the portrait has a 3.25rem minimum at small mobile widths, rising to 3.75rem above a 24rem card container. Names use bounded container-relative sizing with higher small-screen floors. Side controls retain their space; emergency narrow layouts move controls below the identity band. The focused mobile-profile test passed at five portrait sizes from 240px to 1920px wide.

Mobile refinement (2026-09-14): portrait/name scale increased to use the center band more fully. Side controls switch to horizontal groups at a 40rem card width to reserve center clearance. The open language picker raises its ancestor stacking context, removes clipping, and shows toggle-sized discs below its control. No tests run for this refinement, per request.

Mobile navigation update (2026-09-14): both bands originally used a shared 4.5rem height (3.5rem for very short mobile viewports). Sticky slot and bottom clearance follow the shared variables. Bottom buttons use equal flexible slots and permit browser touch zoom; keyboard focus outlines are inset to avoid clipping. The top wrapper no longer retains an unnecessary 3D transform/backface rule. The fixed-height sizing was superseded by the current fluid navigation scale above.

Mobile resume palette (2026-09-14): popup surfaces, labels, icons, and hover states inherit active navigation theme colors, with an accent border and restrained shadow. No tests run per request.

Resume popup revision (2026-09-14): mobile resume now uses MobileResumeMenu.jsx/.scss, separate from MobileTubeMenu (still used by other controls). A body portal avoids header clipping; positioning follows visual viewport bounds and resize/scroll. Options have 44px minimum rows, keyboard navigation, outside dismissal, and focus return. Actions execute directly from the click to preserve browser user activation. Earlier mobile resume palette overrides were removed; the new component owns its styles. Source review only, no tests run per request.

Touch-tablet navigation (2026-09-14): mobile coarse-pointer viewports at least 30rem wide and 40rem tall originally used 5.5rem bands and 3.5rem profile action targets. Shared clearance variables follow band height; navigation flex items cannot shrink. Touch navigation transforms and mobile profile tilt are disabled to avoid hover-driven movement. The fixed band size was superseded by the current fluid navigation scale above; Samsung Firefox hardware behavior remains unverified.

Mobile side controls (2026-09-14): replaced the fixed 40rem row switch with native flex wrapping inside each allocated side column. Each pair forms one row when its actual control widths plus gap fit; groups remain aligned to the outside edges with a compact gap. Reduced center-column gaps free usable width without shrinking the identity. Supersedes the earlier fixed-breakpoint description. No tests run per request.

Compact sidebar toggle (2026-09-14): narrow windows and touch screens up to 64rem use a 2rem visible toggle with a transparent .375rem hit extension. Center alignment is retained. This includes landscape phones using normal composition. No tests run per request.

Unified resume popup (2026-09-14): all NavToolResumeDownloader instances now use ResumeMenu.jsx/.scss, including desktop profile/sidebar controls. This replaces the separate desktop OptionPickerButton popup and retains caller-provided toggle captions/classes. Popup palette, action rows, viewport placement, and keyboard behavior are shared across modes. No tests run per request.

- Sidebar language dropdowns match the trigger width in extended mode and anchor to the full tools-row width in short mode, with 2px outer padding and wrapping option labels. Each option shares the trigger?s --nav-tools-height and navigation surface colors; a subdued flag ball sits behind the centered label, with accent hover/focus feedback. Short-rail options show full-opacity flags only; image alt text preserves their accessible names. Source-only sizing update; no tests run.

Navigation refinement: language option labels occupy a single centered grid cell with 2px row spacing. The sidebar toggle scales from 32px to 56px using viewport width and height, retaining the compact touch override and divider anchoring. Mobile action order is sound/resume on the left and theme/language on the right. Source edits only; no tests run.

Short-rail resume trigger: the shared ResumeMenu root has an explicit `resume-menu` class. The band sizes that wrapper to its full width and height so the trigger and icon row inherit the band height rather than collapsing to intrinsic icon height. No tests run.

Resume popup sizing: intrinsic content width with compact row padding, bounded by the visual viewport. Placement chooses the side of the trigger with enough/more vertical room and constrains scrolling to that space; trigger resizing also updates placement. No tests run.

Experience timeline title, metadata, and body sizing are bounded by the card's container width where container units are supported, with viewport-based fallbacks. Metadata location/company pills stay in two columns until the card is narrower than 23rem, then stack to protect legibility. On mobile, the first experience card bleeds across the section's responsive left gutter; the card's text keeps a compact inset, and its right padding retains the avatar decoration buffer. Body height remains content-driven, with no clipping or fixed-height truncation.

Education timeline body and metadata type scale from each card's inline size when container units are supported, with smaller viewport-based fallbacks and bounded minimum/maximum sizes. Header titles and metadata are centered within the card; date, place, and school details each occupy their own full-width capsule row, with long values wrapping inside the row. Collapsed cards use a lower, centered expansion control. Timeline cards expand to the scrollable section pane, then center at a responsive portion of that pane rather than the browser viewport; percentage sizing keeps the geometry correct inside the centered desktop shell. Avatar wrappers sit above the card layer, and their leftward offsets have hard 12px/10px CSS-pixel caps, so they extend only slightly beyond the pane's left edge at ultrawide sizes; merged/narrow layouts return them to the aligned rail. A measured SVG connector follows avatar centers with alternating curves and recalculates on timeline resize.

Education certification cards use content-driven height, a two-column desktop layout, and a single-column narrow layout. Their metadata switches from three compact tiles to stacked rows when an individual card is narrow, independent of viewport width. The future CCNA path is intentionally muted and grayscale, with a red INCOMING corner ribbon that remains legible in both themes.

Contact's desktop density scopes compact information cards, the primary contact form, location comparison, and complaint composer to `normal`/`ultrawide` viewports at least 80rem wide. Location map controls remain at least 44px tall while the two map panels use a wider aspect ratio to limit article height without shrinking the interactive map below a useful size. Contact and complaint textareas can opt into a CSS-configurable initial wrapper minimum; their existing default remains 200px, while Contact desktop uses 160px. The textarea resizer reads that optional value before locking its initial wrapper size, so other forms retain their current dimensions. Mobile and narrow-landscape layouts do not receive this density pass. Focused coverage lives in `tests/responsive.spec.js`; the valid email-submission path is deliberately not exercised by layout tests.

Education's post-zoom desktop density pass is scoped to normal and ultrawide layouts at viewport widths of 80rem and above. It reduces the section/article heading scale, timeline portrait and card rhythm, certificate frame/detail spacing, and skill-card spacing/type while keeping each timeline's three metadata rows, collapsed descriptions, centered card/avatar layering, and the certification ribbon. Skill popup buttons retain a 44px minimum target. Narrow landscape and mobile keep the existing component sizing. See [_education-density.scss](../../src/styles/_education-density.scss) and its focused assertions in `tests/responsive.spec.js`.

Software's post-zoom desktop density pass uses the same 80rem normal/ultrawide scope. Project title, category, and description sizes follow each card's inline width; project links and category filters retain 44px minimum targets. Testimonial quote, author, and avatar sizing are bounded, while carousel behavior and narrow/mobile layouts remain component-owned. See [_software-density.scss](../../src/styles/_software-density.scss) and its focused assertions in `tests/responsive.spec.js`.

Hardware's desktop density pass uses the same 80rem normal/ultrawide scope. Project cards keep their three-column collection, shorten the oversized title band and body rhythm, and retain readable descriptions and 44px actions/filters. DataProbe's summary tiles, grouped panels, signal metadata, and value blocks use tighter spacing and bounded type; permission unlock, per-signal requests, copy, and expand actions remain intact with 44px targets. The component has no plotted canvas/SVG charts; its visual summary and grouped signal cards are the visualization surface. Narrow landscape and mobile continue to use component sizing. See [_hardware-density.scss](../../src/styles/_hardware-density.scss) and focused desktop/mobile assertions in `tests/responsive.spec.js`.

Writings' desktop density pass uses the same 80rem normal/ultrawide scope. The timeline card rhythm and type, FallingWords hint and play area, feature copy, both skills collections, and manuscript display are compacted while retaining content flow and interactive behavior. The manuscript stays at its native 900:1006 drawing ratio; its existing resize observer redraws the canvas at the capped display size. Timeline actions keep 44px minimum targets, and narrow landscape/mobile retain component-owned sizing. See [_writings-density.scss](../../src/styles/_writings-density.scss) and focused desktop, interaction, and mobile-isolation assertions in `tests/responsive.spec.js`.

Art's desktop density pass uses the same 80rem normal/ultrawide scope. Photography portraits and card text, digital-expression tracks, article headings, educator-stack columns, and SecretPearls copy/gates are scaled for the centered page width. WebArt's measured expanded stage and the pearl tiles' square canvas surfaces remain content-sized; controls preserve 44px targets and reveal/collapse behavior. Narrow landscape and mobile keep their existing layouts. See [_art-density.scss](../../src/styles/_art-density.scss) and focused desktop, interaction, and mobile-isolation assertions in `tests/responsive.spec.js`.

The My Art Digital Expression timeline keeps its overlapping gallery preview layers in a flat 2D stacking context. Card hover fans the four absolute layers; stack hover/focus centers them. Animate both states with the separate `translate`, `transform`, and `opacity` properties so layer geometry stays fixed; avoid animated shadows, positional properties, nested 3D transforms, perspective, and backdrop filters there.

The three Digital Expression timeline cards keep a content-first text column alongside the reserved gallery preview track. Their minimum height follows that preview track, while titles, actions, and descriptions can expand naturally when content wraps on smaller screens.

My Art's compact digital stack uses four columns on medium phone widths, three below 28.75rem, and two only below 21.25rem. Tile padding and avatar scale tighten with each step so the icons and titles remain legible without oversized cards.

Wood Products uses a natural-flow flyer/description/details grid instead of managed image sizing. Below 36rem content width, description moves above and details sit beside the flyer; below 23rem everything stacks. Warm wood colors adapt to the theme. No tests run.

Wood Products revision: two equal-width/equal-height pages with shared corners, side by side above 40rem content width and stacked below. The description uses pure white text and a repeated texture extracted from the flyer?s bottom 4%/rightmost 10% intersection (141?80px). Regenerate `wood-products-texture.webp` from `wood-products-deutschland.webp` using that crop if the flyer changes. A restrained brown outer cover joins the pages. Supersedes the earlier description/details grid.

Wood page refinement: grain uses the top 56px of the 141?80px sample to omit its seam, tiled at 10% ? 2.8% to match flyer grain scale. Four separate horizontal seams span the page. Intro heading, story, takeaway, and contact footer use distinct typographic treatments. No tests run.

The description page now uses `wood-products-five-planks.webp`, a single generated five-plank texture with right-edge shading, displayed once across the page. This replaces the repeated grain tiles and CSS seams.

Experience desktop density (2026-09-26): timeline card/avatar geometry, metadata and body type, the two-page wood-project book, and closing story cards are compacted only at desktop widths in normal/ultrawide layout. Timeline body copy stays around 15px, the wood book is capped from 34rem to 44rem by viewport height and available content width, and closing-story type stays around 15px while its draggable rail keeps a 52px minimum target. Section/article heading rules live with their component owners because those selectors carry important declarations. Narrow landscape and mobile retain their own composition. `tests/responsive.spec.js` checks density at 1366×768 and 3440×1440 and confirms the desktop rules do not leak into 568×320 or 390×844.

Wood description uses shorter localized copy, 14?16px body type, restrained heading scaling and compact spacing. Its min-content height prevents clipping and lets equal grid rows grow when narrow screens require more room. No tests run.

Experience ends with Wood Products (article ID 2; stable IDs preserved by display sorting). Below 40rem, its flyer and text join into one continuous page: natural-height text below the image, no equal-row or portrait-ratio requirement on the text block. Desktop keeps two matching pages.

Art preview actions: circular controls fill their link frame and are explicitly centered. This overrides the global fixed 44px button sizing inside larger photo action frames; the outer link retains a 44px minimum target. Source-only fix, no tests run.

Large touch displays (90rem and wider) keep mobile interaction controls but remove phone/tablet width caps. Profile rows, both navigation bands, and section content use the full viewport with fluid gutters. Source-only update; no tests run.

Wide mobile sizing also scales vertically: profile area targets about 20svh and navigation bands about 10svh, with avatar/action/font sizes tied to the same viewport height. This prevents 72px legacy bands from becoming visually tiny on large touch screens. No tests run.
