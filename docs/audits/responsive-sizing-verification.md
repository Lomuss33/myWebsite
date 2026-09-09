# Responsive sizing implementation and verification

Implemented 2026-09-09. This follows `RESPONSIVE_SIZING_PLAN.md` and the recorded baseline.

## What changed

One shared resolver now selects exactly three whole-site compositions:

| Mode | Rule |
| --- | --- |
| Mobile | Portrait, width below 60rem, or height below 30rem |
| Ultrawide | Remaining windows at least 90rem wide with width/height at least 2.1 |
| Normal | Remaining windows |

Thresholds use the root font size. Large portrait displays keep mobile composition with bounded content widths. Small landscape windows retain mobile navigation. React and SCSS consume the same `data-layout` state.

Removed the inverse-width/transform system that shrank entire sections. Content now uses ordinary flow, flexible grid columns, bounded page widths, container queries, wrapping headings, and readable rem-based text. Normal content is capped at 80rem and ultrawide content at 112rem, alongside a bounded navigation rail. Prose uses a 68ch reading limit where applicable.

Forms retain 1rem text; primary/circular/copy controls have a 2.75rem minimum target. Article captions have a 0.875rem floor. Dense component grids wrap within their actual slots. Mobile section navigation scrolls horizontally when labels do not fit. Short landscape navigation uses horizontal icon/label pairs. Gallery dialogs retain fullscreen width and reachable dismissal after mode changes. Lazy responsive images use their rendered slot size where supported, with the existing sizes hint as fallback.

## Verification

- Chromium: **27 tests passed**, including 192 combinations (8 sections x 4 languages x 2 themes x 3 modes), mode/navigation agreement during resizing, 200% root-font enlargement and editable form access, and gallery resizing/dismissal.
- Four pure resolver tests passed, including fractional ratio boundaries, portrait screens, short windows and enlarged preferred text.
- ESLint, translation validation and production build passed. Vite retains its large-chunk advisory.
- Visual checks identified and corrected article font-size replacement errors and clipped short-landscape navigation labels. The regression suite now checks feature body-text bounds as well as document width, heading bounds and section transforms.
- Firefox: **6 tests passed**, covering all 8 sections in all 3 modes (English/dark), resize agreement, enlarged form text and gallery dismissal. A separate 10-viewport Contact sweep from 240px to 7680px, including 1920x3840 portrait, showed no document overflow, 16px input text and no section transform; measurements are in `responsive-sizing-viewport-checks.json`.

The baseline Contact input could render around 7.74px after ultrawide scaling; current representative layouts use 16px with no section transform. The old 1680px-wide transition no longer independently activates ultrawide sizing. Portrait screens use the same composition regardless of physical display size.

## Reproduce

```powershell
npm ci
npx playwright install chromium firefox
npm run test:layout
npm run test:responsive
$env:PLAYWRIGHT_BROWSER='firefox'
$env:RESPONSIVE_SMOKE='1'
npm run test:responsive
npm run lint
npm run build
```

Clear `PLAYWRIGHT_BROWSER` and `RESPONSIVE_SMOKE` to restore the full Chromium matrix. `PLAYWRIGHT_EXECUTABLE_PATH` optionally selects an installed compatible browser. Playwright output stays in the ignored `test-results` directory.

## Remaining verification limits

Actual browser zoom at 200%/400%, real iOS Safari/Android Chrome keyboards, safe areas, browser chrome, fullscreen API transitions, and high-DPI canvas/image quality still need device/manual verification. Root-font enlargement is not a substitute for actual browser zoom. The 240px emergency case is a fit check, not a promise of the same visual density as a modern phone.

Tests sample meaningful layout and interaction contracts; they do not establish that every animation, art canvas, nested clipping ancestor or possible future screen has been visually certified. Maps and decorative artwork retain their own internal coordinate systems. Short landscape windows necessarily leave less visible content, which remains scrollable.

## Desktop density follow-up

Stakeholder adjustment: mobile article sizing is preserved; only mobile navigation bars were refined. Desktop/ultrawide now use tighter spacing, smaller heading limits, 16px shared body text, narrower card minimum widths, smaller card padding/avatars and a bounded Home image height. No section transform was reintroduced.

Focused Firefox review: Home, Software and Contact at 1366x768; Home at 3440x1440, 320x568 and 568x320. All six views fit the document width and retain unscaled sections. Lint, i18n validation and production build passed. The full regression matrix was intentionally not repeated for this adjustment. The approximate 15% density goal is a design target, not a uniform measured reduction for every component.

## Centered background and stronger desktop reduction

The latest stakeholder revision supersedes the earlier unscaled-desktop requirement: normal and ultrawide content now use native CSS layout zoom of 0.8. This produces an explicit 20% size reduction; mobile remains at zoom 1. Desktop rendered control/font sizes therefore also reflect this factor (for example, a 44px control renders at about 35px). The existing inverse-width transform system remains removed.

The shell once again spans the viewport and renders the original garden and sky background. The page naturally stops at 72rem (1152 CSS px at the default root size), centered in the space beside the sidebar. On a 3440px viewport the page is 1152px wide, exposing equal background gutters beside it within that remaining space.

Focused Firefox checks passed for desktop Contact, ultrawide Home and mobile Home: correct page height, no document overflow, working input entry and mobile zoom 1. Visual inspection confirmed the restored background. The regression control-size assertion was updated to reflect the deliberately smaller desktop targets; the full matrix was not rerun.

## Sidebar profile card fit controller

Replaced the competing extended-desktop profile arrangements with one component stylesheet and a fit controller. The controller observes the sidebar box, reserves at least 44px per navigation entry plus the tool band, and allocates the remaining bounded space to the profile. It checks actual element bounds and name overflow before selecting paired/stacked layouts, with optional role text, or compact name/actions. If none fits, it hides the entire profile and releases its height. Font loading, name changes and resizing trigger a new fit. Mobile and the manually collapsed rail retain their existing presentations.

A focused Firefox regression passed across ten rail width/height cases, including narrow, tall, short and recovery from hidden to visible. Assertions cover containment, separation of visible profile elements, and minimum navigation button heights. Lint and production build passed. These checks support the defined fit behavior; they do not claim exhaustive certification of every conceivable box or animation frame.

## Restore expressive profile layouts

Corrected the previous profile regressions: restored the portrait's original inline-flex internal composition (the replacement grid/block formatting stretched its decorative layers), restored the 25% rail-height allowance with a 480px ceiling, and restored the flowing script name. Tall cards now prioritize stacked portrait/controls/name layouts, including one-row or two-row controls. The animated sentence band occupies the bottom row whenever the measured layout fits. Short cards still yield to navigation.

The focused Firefox test now covers twelve size cases and explicitly checks tall layout selection, visible sentence bands and square portraits, in addition to containment and non-overlap. Visual inspection confirmed normal and tall profile arrangements. Lint and production build passed.

## Remove surplus profile spacing

After selecting a fitting arrangement, the controller now measures its natural row height and returns unused space to navigation. The selected portrait size is held steady during this measurement to avoid container-height feedback. It checks the trimmed layout again and retains the previous safe allocation if trimming would cause overflow or overlap.

The tall 1920px-height check retained the stacked portrait, two control rows, name and sentence band in 351px rather than consuming the entire 480px allowance. The twelve-case profile regression and lint passed.

## Additional compact profile arrangements

Added the portrait-left / actions-over-name-right band, followed by name-left/actions-right, name-only and hidden fallback. Paired portrait/name layouts now choose horizontal or vertical actions; horizontal pairs spread across the remaining width. The final spacious stage permits only 8% profile-control growth. Seventeen focused cases passed, including assertions for the new stages; lint and build passed. Next sizing work is described in `profile-element-sizing-plan.md`.

## Balance profile controls and protect the name

Paired layouts now use explicit portrait/control tracks with equal 6px gaps, preventing the animated text or name from stretching the upper band. The portrait can use more available room within the existing fit limits. Single-band and name/actions layouts use 36px profile controls; navigation keeps its separate 44px minimum. The sidebar toggle is fixed at 44px and positioned entirely outside the profile card so it cannot cover the name. Removed inherited top padding and tightened containment tolerance.

## Mobile name/portrait composition

Mobile-only stylesheet places the first name left of the portrait and surname right, with small inner gaps and symmetric outer control groups. At container widths of 32rem and above, control pairs become horizontal. Emergency widths up to approximately 240px use a separate balanced control row below the name/portrait band. Avatar framing remains intact; existing navigation-band heights and bottom-content clearance remain in use.

Focused Firefox checks passed at 240x568, 320x568, 568x320, 768x1024 and 1920x3840. Assertions cover containment, non-overlap, name order, control direction, document overflow and bottom-nav visibility. Lint and build passed. Real mobile browser chrome and virtual keyboards remain device checks.

## Mobile control order and spacing

Mobile controls now follow theme/resume on the left and pronunciation/language on the right. The center has larger responsive gaps between each name, portrait and inner controls. The five-size mobile check explicitly verifies control order as well as containment and no overlap.

## Portrait-only mobile selection

Mobile composition now requires viewport width strictly less than viewport height. Small width, short height and enlarged fonts no longer force landscape windows into mobile mode. Square and landscape windows use normal or ultrawide composition. Removed the previous focused-input height preservation so the resolver always uses the current viewport ratio.
