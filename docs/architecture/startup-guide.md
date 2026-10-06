# Startup navigation guide

Feature ID: `startup-navigation-guide`. Search names: **Explore the edges**, **Explore the sidebar**, **Look around** (previous copy), Explore the site, menu on the left, edge guide, navigation hint, spotlight, startup overlay, dimmed Home, onboarding lighting, Entdecke die Ränder, Istraži rubove, Kenarları keşfet.

Verified: 2026-10-06 against the controller, translations, styles and local Chromium samples from 280×653 to 3440×1440, covering EN/DE/HR/TR and both themes. Observed persistent display, idle replay, keyboard/native mobile/nested desktop scroll dismissal, interrupted entrance, live reduced motion, rotation and app pause/resume. Syntax and diff checks passed; no build or automated suite was run. Physical Android suspension, Safari and Firefox behavior are not certified by this check.

Those earlier visual samples covered previous caption revisions. The current composition uses compact feathered backing and one local drop shadow per text group. Backing, drop shadow and glyph shadow share the main veil's RGB colour at stronger local opacity: black in dark mode and the same pale blue in light mode. All four languages explain navigation and adjustments: mobile has a headline with two contextual instructions; desktop has a headline and one supporting explanation. Current observations are recorded below; earlier phone samples do not certify revised copy.

Route: `#about` (Home). This is visual guidance for the existing navigation, not a modal or an interactive control.

## Accepted behavior

- Keep the guide visible until interaction. Do not add an expiry timer or a stored/session acknowledgement that suppresses future reminders. Slow readers and people returning later must still be able to see it.
- Preserve the existing initial delay (1.1 seconds after readiness) and idle reminders: 5 seconds initially, increasing by 5 seconds after each completed repeat. Actual interaction restarts the idle timer; ordinary page animations and unrelated DOM changes do not.
- Pointer movement, touch, clicks, keyboard input, focus and scrolling, including a nested page scroller, dismiss it. Navigation and page controls remain usable through the overlay.
- On mobile, leave the whole visible profile header and top navigation clear; the lower clear area covers the bottom navigation bar. Use measured bounds and soft fades into a strong central veil, not fixed screen percentages or hard cuts.
- On desktop, retain the travelling sidebar spotlight and subsequent ambient motion. Reduced-motion preference makes that lighting still; it does not shorten the guide's lifetime. Preference changes take effect while the guide is visible.
- Dark mode uses a strong black veil; light mode uses a soft blue veil with navy text. Caption backing and shadows derive from `--startup-guide-veil-rgb`, with fully opaque source colours. The backing covers the full text block, including multi-line ends, and blurs smoothly outward while the lettering stays sharp. Desktop uses a slightly larger backing and stronger local drop shadow than mobile. Keep this paint outside layout, with no visible panel edge; preserve the main-veil opacity, measured clear navigation areas and soft fades instead of adding surrounding haze or a different tint/white halo.
- Recompute geometry for viewport/orientation, navigation size, font, layout, theme and language changes. Keep captions inside the visible viewport; omit supplementary edge captions when they would collide on a short screen.
- Stop animations and pending waits when dismissed, destroyed, hidden or paused. Reconcile Home and its navigation on return. Leaving Home removes the guide.
- Use a restrained text hierarchy without visible boxes, pills, borders, status dots or broad glow clouds. Each group has compact feathered backing and one additive drop shadow for readability. The mobile upper hint explains language, light/dark mode and résumé download by the profile; the lower hint explains choosing a section below and finding additional pages in its top menu. Do not imply that Home's hidden page submenu is visible: extra page menus appear for categories with multiple pages. Keep the central headline without a redundant subtitle or repeated destination names. Desktop explains page links on the left and language/light-dark controls beneath them. Center the mobile message between measured edges; keep edge captions in the shaded area. Set the UI font explicitly because the guide mounts outside the layout. EN/DE/HR/TR remain supported. The overlay stays `aria-hidden` and never takes focus; separate screen-reader/help UI remains an unimplemented proposal.

## Ownership and dependencies

Read the controller first for timing or interaction bugs. Read the styles first for visual adjustments, then check the measured geometry in the controller.

| Owner | Role |
|---|---|
| [startupGuide.js](../../src/hooks/startupGuide.js) | Lifecycle, readiness, timers, dismissal, cancellation, measured targets and spotlight motion |
| [startupGuideI18n.js](../../src/data/startupGuideI18n.js) | All visible guide captions in EN/DE/HR/TR |
| [_page.scss](../../src/styles/layout/_page.scss) | `startup-guide-*` gradients, theme palettes, typography and independent caption mattes/shadows |
| [main.jsx](../../src/main.jsx) | Initializes/destroys the controller; publishes app pause/resume events |
| [responsiveLayout.js](../../src/config/responsiveLayout.js) | Authoritative `html[data-layout]`; do not create another breakpoint policy in the guide |
| [NavHeaderMobile.jsx](../../src/components/nav/NavHeaderMobile.jsx), [NavLinkPillsFixed.jsx](../../src/components/nav/partials/NavLinkPillsFixed.jsx), [NavTabController.jsx](../../src/components/nav/NavTabController.jsx) | Mobile header/top/bottom target elements |
| [NavSidebar.jsx](../../src/components/nav/NavSidebar.jsx) | Desktop rail and tools target elements |

The guide observes target sizes and relevant navigation/Home mutations. It caches measured geometry for ambient animation frames. Typed text updates must not reset reminder timers. Target selector changes in navigation components must also update the controller.

## Focused verification

Use the [targeted validation guidance](../guides/validation.md). These checks describe what to inspect after an edit; they do not claim that every device was tested.

1. Open Home without interacting. Wait through loading and the initial delay; leave it idle beyond the entrance animation. It must stay visible until interaction. Dismiss it and confirm the idle reminder returns even while the page's typing animations run.
2. Sample a tiny phone (280×653), ordinary phone (390×844), tablet (768×1024), desktop (1366×768) and ultrawide (3440×1440). In both themes, check clear navigation areas, soft transitions, readable copy and caption bounds. Sample all four languages.
3. Resize/rotate while visible. Confirm current layout mode, target geometry and captions update together. Enable reduced motion while visible; the spotlight must stop moving while the guide remains.
4. Dismiss using Escape/Tab, pointer/touch input and the inner Home scroller. Interrupt the entrance animation, leave Home or pause/resume the app; an obsolete animation must not revive removed markup or suppress later reminders.
5. Check that ordinary navigation remains clickable and focusable, dialogs/editable controls do not receive a new guide, and animations perform no per-frame target/label layout measurements.

## Current caption verification

The explanatory copy was checked against mobile header controls, category/page-menu gating and desktop page/tool placement. Earlier live text-range probes at 280px, 390px and 974px widths found no overflow in EN/DE/HR/TR; this shadow-only change preserves text sizing and placement. Current computed styles confirm both palettes, 12px mobile/16px desktop backing blur and 12px/18px local drop-shadow blur, with no caption padding. Rendered 390px-wide caption samples in both themes and guide modes were inspected over dense underlying text, along with the light desktop Home composition. These are local CSS/visual checks, not full device emulation. Full phone/rotation and dark-page visual checks remain unverified because earlier preview resize attempts exposed inconsistent viewport/layout state. Earlier lifecycle/device samples above belong to previous caption revisions. Documentation paths and diff checks passed; no build or automated application suite was run.

## Keep this page current

Update this contract and its verification scope with controller, caption or style behavior changes. Add new user wording to the search names when useful; the feature ID and owner paths stay stable. Record confirmed defects separately from accepted behavior, and label unapproved ideas as proposals. Do not duplicate this contract in long layout histories or archived plans.
