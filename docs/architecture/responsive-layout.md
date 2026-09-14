# Responsive layout

Verified: 2026-09-11 against resolver, shell, and stylesheet entry point; not exhaustive device testing.

## Mode authority

[responsiveLayout.js](../../src/config/responsiveLayout.js) reads viewport dimensions/root font size and publishes `html[data-layout]`.

| Mode | Rule, in order |
|---|---|
| mobile | Width less than height |
| ultrawide | Otherwise width at least 90rem and width/height at least 2.1 |
| normal | Everything else, including square windows |

Do not introduce independent width-only mobile fallbacks. Container breakpoints may rearrange individual components. Visual viewport keyboard clearance is separate. Update the resolver and boundary tests together.

## Desktop density

[LayoutNavigation.scss](../../src/components/layout/LayoutNavigation.scss) uses native desktop CSS zoom 0.8 with a 72rem page cap and width compensation. Mobile is not reduced by that rule. Computed and rendered sizes differ: 44 CSS pixels render at about 35px on desktop.

This density and bounded, centered ultrawide content with visible garden/sky gutters are stakeholder choices. The older 0.62/0.52 transform shrinking is historical, not a requirement to restore.

## Styling ownership

- [app.scss](../../src/styles/app.scss): imports and cascade order.
- [_sizing.scss](../../src/styles/_sizing.scss): shared responsive overrides.
- [_mobile-profile.scss](../../src/styles/_mobile-profile.scss): mobile profile.
- [_home-hero.scss](../../src/styles/_home-hero.scss): multiple Home article overrides and reliability safeguards despite its narrow filename.
- [useSidebarProfileLayout.js](../../src/components/nav/useSidebarProfileLayout.js): rail-space fit; navigation takes priority over optional profile content.
- [_profile-fit.scss](../../src/components/nav/partials/_profile-fit.scss): profile states.

Inspect computed styles before adding rules. Component SCSS and later overrides coexist. Consolidation should preserve behavior and be a separate change. Measure actual rendered geometry under zoom.

[Validation limits](../guides/validation.md#known-gaps) include keyboards, safe areas, browser zoom, and weak GPUs. Archived measurements do not certify the current tree.

## Avatar contact card

Updated 2026-09-13: clicking the profile portrait in the extended rail, short rail, or mobile header opens `ProfileContactDialog`. The native modal dialog is portaled to `document.body` so it remains centered at full size outside desktop CSS zoom. The backdrop is 10% black without blur. The card compacts at short viewport heights, then scales to the available visual viewport when needed so all content stays visible without scrolling. Resize observation also refits translated content. The inactivity timer has no visible explanatory message. Outside clicks, Escape, the close button, and profile/social links dismiss it; seven seconds without interaction also dismisses it. Clicks inside and keyboard activity restart the timer. Native modal focus containment and focus restoration support keyboard use. Contact details and translated labels live in `public/data/profile.json`; Gravatar serves the supplied portrait, cover, and social icons. The existing randomized initial avatar and frame hover effects remain; avatar clicks now open contact details instead of switching portraits.

See `tests/profile-contact.spec.js` for positioning, dismissal, and inactivity checks.

## Mobile profile sizing

Updated 2026-09-12: the portrait has a 3.25rem minimum at small mobile widths, rising to 3.75rem above a 24rem card container. Names use bounded container-relative sizing with higher small-screen floors. Side controls retain their space; emergency narrow layouts move controls below the identity band. The focused mobile-profile test passed at five portrait sizes from 240px to 1920px wide.

Mobile refinement (2026-09-14): portrait/name scale increased to use the center band more fully. Side controls switch to horizontal groups at a 40rem card width to reserve center clearance. The open language picker raises its ancestor stacking context, removes clipping, and shows toggle-sized discs below its control. No tests run for this refinement, per request.

Mobile navigation update (2026-09-14): both bands use a shared 4.5rem height (3.5rem for very short mobile viewports). Sticky slot and bottom clearance follow the same variables. Bottom buttons use equal flexible slots and permit browser touch zoom; keyboard focus outlines are inset to avoid clipping. The top wrapper no longer retains an unnecessary 3D transform/backface rule. Source review only; no tests run per request.

Mobile resume palette (2026-09-14): popup surfaces, labels, icons, and hover states inherit active navigation theme colors, with an accent border and restrained shadow. No tests run per request.

Resume popup revision (2026-09-14): mobile resume now uses MobileResumeMenu.jsx/.scss, separate from MobileTubeMenu (still used by other controls). A body portal avoids header clipping; positioning follows visual viewport bounds and resize/scroll. Options have 44px minimum rows, keyboard navigation, outside dismissal, and focus return. Actions execute directly from the click to preserve browser user activation. Earlier mobile resume palette overrides were removed; the new component owns its styles. Source review only, no tests run per request.

Touch-tablet navigation (2026-09-14): mobile coarse-pointer viewports at least 30rem wide and 40rem tall use 5.5rem bands and 3.5rem profile action targets. Shared clearance variables follow the band height; navigation flex items cannot shrink. Touch navigation transforms and mobile profile tilt are disabled to avoid hover-driven movement. This is a source-based fix; Samsung Firefox hardware behavior remains unverified. No tests run under the existing request.

Mobile side controls (2026-09-14): replaced the fixed 40rem row switch with native flex wrapping inside each allocated side column. Each pair forms one row when its actual control widths plus gap fit; groups remain aligned to the outside edges with a compact gap. Reduced center-column gaps free usable width without shrinking the identity. Supersedes the earlier fixed-breakpoint description. No tests run per request.
