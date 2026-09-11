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
