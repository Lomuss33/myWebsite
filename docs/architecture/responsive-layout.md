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
