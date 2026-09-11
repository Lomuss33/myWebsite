> Status: historical / superseded. Archived 2026-09-11. Earlier proposals and checks are not current requirements. See [current layout guidance](../../architecture/responsive-layout.md).

**Responsive sizing investigation — 8 September 2026**

**Recommendation: rebuild the shared sizing foundation, then migrate the existing components.** The site has reusable components, responsive images, container queries, and useful mobile viewport handling worth retaining. Its current sizing rules do not meet the requested three-mode behavior. Shared content scaling, incompatible mode decisions, and undersized typography affect enough of the site that isolated component patches would leave the underlying problems in place.

This is an investigation and implementation proposal. Application code, dependencies, content, and deployment have not been changed.

The follow-up [implementation plan](plan.md) defines the work packages, starting size budgets, and completion checks.

**What was investigated**

The baseline was commit `ae07396`, with a clean working tree before this report. I reviewed the React/Vite architecture, SCSS foundation, viewport provider, shell/navigation, scrolling, section wrappers, article renderers, forms, modal sizing, image handling, and canvas sizing. The site has eight registered sections and 32 configured articles, with four supported languages and two themes.

The source inventory contains 119 SCSS files, approximately 43,800 lines, 404 Bootstrap breakpoint mixin calls, 111 explicit media-query blocks, 49 container-query blocks, and 728 `clamp()` calls. These are source occurrence counts, including rules unrelated to sizing; they are evidence of distributed ownership, not a count of defects. Adding more `clamp()` calls alone will not establish a consistent system.

I used an isolated headless Chromium browser against the existing local Vite server, at device scale factor 1. The main sweep used English, dark theme, and reduced motion: 20 home-page viewport samples and the other seven sections at 320×568, 768×1024, and 3440×1440, totaling 41 layout samples. Ten additional checks used touch/mobile emulation to inspect the home heading in English, German, Croatian, and Turkish, the 767/768px transition, short landscape behavior, and contact controls. Screenshots were inspected at representative sizes. The 41-sample sweep recorded no JavaScript page errors; this does not establish functional or accessibility conformance.

Tested home sizes, in CSS pixels: 280×653, 320×480, 320×568, 360×800, 390×844, 568×320, 768×1024, 820×1180, 1024×1366, 1080×1920, 1366×768, 1440×900, 1679×1050, 1680×1050, 1920×1080, 1920×3840, 2560×1440, 3440×1440, 5120×1440, and 7680×2160.

The compact measurements are in [responsive-sizing-baseline.json](../../evidence/2026-09-responsive-sizing/responsive-sizing-baseline.json). Full measurements, temporary inspection scripts, and screenshots remain locally in `C:/Users/LovroPC/AppData/Local/Temp/website-sizing-audit-20260908/`.

**Confirmed problems, in priority order**

1. **The section wrapper shrinks the whole interface.** [SectionContent.scss](../../../src/components/sections/SectionContent.scss), lines 5–9, 51–52, and 107–112, sets scale to 0.62 on desktop and 0.52 in ultrawide. The inner wrapper is widened by the inverse of that scale, then transformed back down. Layout calculations therefore see a much wider space than the user sees. Text, buttons, form fields, and decorations all shrink together. A CSS minimum size inside this wrapper does not guarantee that minimum rendered size.

   For example, contact inputs use a 14.88px computed font on larger screens. After the section transform, this is approximately 9.23px at 1366×768 and 7.74px at 3440×1440. The nominal 65px input height becomes 40.3px and 33.8px respectively. This is the most important foundation defect.

2. **The overall modes disagree with the requested screen-shape model.** [ViewportProvider.jsx](../../../src/providers/ViewportProvider.jsx), lines 210–216, chooses mobile solely below the Bootstrap `md` width of 768px. [_extend.scss](../../../src/styles/_extend.scss), lines 17–22, separately chooses ultrawide at any width of at least 1680px, or at least 1360px with a ratio of 2:1. React has no corresponding explicit ultrawide mode.

   Consequently, a 768×1024 tablet and a 1080×1920 portrait display use the desktop sidebar. A 1920×3840 tall display receives ultrawide styling. Widening a 1679×1050 window by one pixel changes content scale from 0.62 to 0.52, a 16.1% reduction, and expands the sidebar from approximately 258.4px to 340px.

3. **Large screens get a narrow, increasingly isolated page.** [LayoutNavigation.scss](../../../src/components/layout/LayoutNavigation.scss), lines 5–12 and 134–152, keeps the main page at a maximum of 960px while ultrawide positioning centers it in the viewport. The page occupies 27.9% of a 3440px viewport, 18.8% at 5120px, and 12.5% at 7680px. Whitespace and a reading-width limit are useful, but this cap covers the whole page, including grids and interactive content, while the text is also being reduced to 52% scale.

4. **Small-screen typography is reduced twice.** [_page.scss](../../../src/styles/layout/_page.scss), lines 18–24, reduces the root to 15px on mobile and 14px below 381px. [_typography.scss](../../../src/styles/layout/_typography.scss), lines 20–27, also reduces individual text classes. At 320px, a contact input using `text-4` renders at 11.06px. The shared `text-1` rule can compute to 9.52px at this width, although that is a rule-derived value rather than a claim about every visible element. Heading and lead rules also use `!important`, complicating component-level sizing ownership.

5. **The home heading is visibly clipped on small phones.** [SectionHeader.scss](../../../src/components/sections/SectionHeader.scss), lines 134–143, forces the home title onto one line. At 320×568, the English title needs approximately 325px inside a 303px content box; its text extends to x=333px. German needs approximately 363px and extends to x=371px. Croatian and Turkish fit in the focused sample. The document still reports a 320px scroll width because outer clipping masks the overflow. A check for page-level horizontal scrolling alone would miss this defect.

6. **Navigation takes too much of the initial view on short screens.** At 568×320, the mobile profile header measured 175.2px, followed by a 72px section strip and a 72px bottom bar: approximately 319px of navigation in a 320px-high first view. The header can scroll away, so this is not a claim that the entire page is permanently inaccessible. It demonstrates that the first view has almost no content budget. [_root-flags.scss](../../../src/styles/_root-flags.scss) also allows mobile rows to grow to 108px, while [NavSidebar.scss](../../../src/components/nav/NavSidebar.scss) allocates substantial height to desktop navigation. These need one coherent allocation policy.

7. **Some controls are much smaller than their surrounding interface suggests.** At 3440×1440, contact copy buttons measured approximately 19.2px high, and Send Message measured 28.6px high. At 320×568, Send Message was 38.4px high with an 11.76px label. The desktop section fullscreen control is explicitly 20×20px in [Section.scss](../../../src/components/sections/Section.scss), starting at line 1654, and 18×18px at a narrower desktop width. These are concrete sizing concerns; a WCAG target-size verdict additionally requires checking spacing and the applicable exceptions.

8. **Component geometry often depends on the viewport instead of the available slot.** For example, [ArticlePortfolio.jsx](../../../src/components/articles/ArticlePortfolio.jsx), lines 45–54, picks column counts from viewport breakpoints. The available space also depends on sidebar state, the 960px page cap, section padding, and the inverse-width transform. Similar viewport-specific budgets exist in cards, timelines, skills, text bubbles, and forms. Removing the shared transform will expose those assumptions, so the migration must update components alongside the foundation.

**Measured examples**

| Viewport | Current composition | Page width | Section scale | Key result |
|---|---|---:|---:|---|
| 320×568 | Mobile | 320px | 1 | English/German home title clips; input text 11.06px |
| 568×320 | Mobile | 568px | 1 | Navigation occupies about 319px of the initial view |
| 768×1024 | Desktop | 537.2px | 0.62 | Sidebar consumes about 30% of the portrait width |
| 1080×1920 | Desktop | 849.2px | 0.62 | Tall display does not enter mobile composition |
| 1366×768 | Desktop | 960px | 0.62 | Contact input text effectively 9.23px |
| 1679×1050 → 1680×1050 | Desktop → ultrawide styling | 960px | 0.62 → 0.52 | One extra pixel makes content 16.1% smaller |
| 1920×3840 | Ultrawide styling | 960px | 0.52 | Tall screen classified as ultrawide |
| 3440×1440 | Ultrawide styling | 960px | 0.52 | Input text effectively 7.74px; copy buttons 19.2px high |
| 7680×2160 | Ultrawide styling | 960px | 0.52 | Main page occupies 12.5% of the viewport width |

Effective text sizes above are computed font sizes multiplied by the known shared section scale. Control dimensions are browser bounding-box measurements. Overflow flags in the raw sweep include intentional decorative bleed and are not automatically treated as content defects.

**Proposed three-mode system**

There should be exactly one overall mode value: `mobile`, `normal`, or `ultrawide`. Mobile is a composition for portrait or constrained windows, including large tall displays; it must not mean a particular device or touch capability. Pointer type should affect interactions independently.

Ratios should choose the composition, with minimum available-space guards. Ratio alone cannot distinguish a 568×320 phone from a 3840×2160 desktop: both are approximately 16:9. Percentages alone would shrink essential text and controls on the first and enlarge them excessively on the second.

The following is a concrete starting policy for implementation, subject to verification after the transform is removed. Evaluate the rows in order:

| Mode | Initial selection rule | Composition |
|---|---|---|
| Mobile | Width/height below 1, **or** width below 60rem, **or** stable usable height below 30rem | Native vertical document flow; compact navigation; content centered and bounded on large portrait displays |
| Ultrawide | Remaining windows with width/height at least 2.1 and width at least 90rem | Bounded navigation and a wider content region; grids/media use the available room; prose retains its reading width |
| Normal | All remaining windows | Sidebar plus flexible content region, with content-led scrolling and bounded dimensions |

At the ordinary 16px browser default, those width guards begin at 960px and 1440px, and the height guard at 480px. They are fit budgets to validate, not a new device catalog. This policy sends 768×1024, 1080×1920, 1920×3840, and 568×320 to mobile; 1366×768 and 1920×1080 to normal; and 3440×1440 and 5120×1440 to ultrawide.

Use one declared source for mode conditions and publish the resulting mode to both styling and React behavior. It must govern sidebar mounting, navigation, scrolling, transitions, and overlays together. Avoid separate hand-maintained CSS and JavaScript thresholds. Keyboard opening and browser chrome should update visible-space offsets without unexpectedly rebuilding the shell; the stable-height interpretation needs verification on real mobile browsers.

Inside a mode, cards may wrap or change columns when their own container becomes too narrow. These are local fit decisions, not additional whole-site modes. CSS container queries support this separation directly. [MDN container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)

**Sizing contract for every component**

| Element | Proposed contract |
|---|---|
| Root typography | Start at `100%`; respect browser font preferences. Remove shared content transforms. |
| Body text and form values | Start at 1rem; use a restrained fluid range up to roughly 1.125–1.25rem where appropriate. Reflow before reducing readability. |
| Secondary text | Start around 0.875rem. Essential instructions and controls must not rely on miniature captions. These sizes are design targets, not a WCAG minimum-font rule. |
| Headings | Bounded fluid sizes; wrap and balance longer translations; allow the block to grow. |
| Reading width | Target roughly 60–70ch, allow up to about 75ch for suitable prose. On small screens, use the available width without imposing a minimum that causes overflow. |
| Buttons and inputs | Aim for at least 2.75rem/44px hit height at the ordinary default; grow for larger text and multiline labels. Bound padding and icon size instead of fixing every control height. |
| Page and card layout | Use percentages, flex, and fractional grid tracks for allocation; `minmax(0, 1fr)` and `min-inline-size: 0` where needed. Let columns collapse when the content slot cannot support them. |
| Gutters and spacing | A small shared token scale with percentage/container-based preferred values and rem floors/caps; larger screens should not create giant gaps automatically. |
| Images and video | Fit the parent; preserve aspect ratio; apply `object-fit` according to content. Align responsive-image `sizes` hints with actual rendered slots. |
| Canvas, maps, interactive art | Size from the component host; retain bounded render resolution and device-pixel-ratio budgets. Give toolbars readable controls and local wrapping. |
| Modals and menus | Bound width and height to available space; scroll long contents; keep dismissal and primary actions reachable above keyboard/safe-area boundaries. |
| Decorations | Scale independently within an explicit space budget. Their bleed and clipping must not establish the dimensions of readable content. |

Percentages and `fr` units are appropriate for allocating space; `rem`, `ch`, intrinsic sizes, and bounded `clamp()` expressions protect usability. Reserve pixels for details such as borders or deliberate rendering budgets. `svh` represents the small viewport; `dvh` follows changes in the dynamic viewport. Their roles should be deliberate rather than mixed across unrelated height calculations. [MDN length units](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/length)

A 44px target is the proposed comfort baseline. WCAG 2.2 AA's target-size criterion generally uses 24×24 CSS pixels with specified exceptions, including spacing. [W3C target-size explanation](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

**Implementation order and dependencies**

1. **Establish the mode and sizing contract.** Add shared mode definitions and semantic tokens for type, spacing, reading width, navigation, controls, and media. Preserve the current measurements as the baseline. The current `_tokens.scss`, `_root-flags.scss`, `_extend.scss`, and `ViewportProvider.jsx` are the main starting points.
2. **Migrate the shell and section geometry together.** Update `LayoutNavigation`, `Layout`, `Section`, `SectionContent`, `Scrollable`, and navigation consumers to the common modes. Remove inverse-width scaling and rework the rendered-height compensation in `SectionContent.jsx`. Its resize/mutation observers currently compensate for transformed geometry, so merely setting scale to 1 is not a finished fix. Preserve intentional animation measurements and decoration behavior where still needed.
3. **Migrate typography and shared controls.** Correct the root/text-class interaction, heading wrapping, buttons, inputs, textareas, copy controls, tabs, and modal titles. Establish rendered-size checks here before migrating every specialized card.
4. **Migrate articles by family.** Home: intro/contact pills, information cards, stack, and name-origin stories. Experience/education/writing: timelines, previews, certificates, skills, long text, manuscript, and falling words. Software/hardware: project grids, filters, testimonials, and data probe. Art: galleries, timelines, tiles, stack, and interactive canvases. Contact: contact cards, both forms, and map controls. Base each family on its allocated container rather than global viewport width.
5. **Complete overlays and dynamic states.** Verify gallery/video/QR/resume/confirmation modals, tool menus, tooltips, notifications, loading/error states, expanded cards, sidebar collapse, fullscreen, and section transitions. Audit text-fitting code so overflowing content can grow or wrap rather than continually reducing font size.
6. **Remove superseded sizing rules and verify the result.** Delete conflicting width-based layout switches and compensation values as their consumers migrate. Retain useful interaction queries and component container queries. Run lint, build, the sizing matrix, and targeted interaction checks against the completed migration.

Each stage should leave the migrated paths reviewable and functional. This is a substantial sizing refactor across the foundation and component families, not a complete rewrite of the content platform. Existing themes, artwork, JSON content, navigation destinations, and functionality provide the design to preserve.

**Completion criteria**

- Only the three agreed whole-site modes exist; tall displays resolve to mobile composition. Test immediately below, at, and above every mode boundary, plus sidebar states and window rotation.
- Ordinary content reflows without clipping or page-level horizontal scrolling at 320 CSS pixels. Keep 280px as an extra small-screen stress case. Maps, diagrams, and other inherently two-dimensional content require appropriate local behavior rather than forced distortion. [W3C reflow explanation](https://www.w3.org/WAI/WCAG22/Understanding/reflow)
- Text can be enlarged to 200% without losing content or functionality. Include 400% desktop zoom/reflow checks, enlarged browser default fonts, and actual rendered font/target dimensions. A viewport resize or device-pixel-ratio change alone does not test browser zoom. [W3C resize-text explanation](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- Text-containing boxes are checked for clipped ranges and obscuring ancestors; page `scrollWidth` alone is insufficient. Separate expected decoration overflow from meaningful content overflow.
- All eight sections, four languages, and both themes pass representative mobile, normal, and ultrawide sizes. Include long titles, expanded content, forms, toolbars, modals, and keyboard focus.
- Test iOS Safari, Android Chrome, desktop Chromium, and Firefox; cover real on-screen keyboards, browser chrome changes, safe areas, touch, mouse, fullscreen, and resizing while a dialog is open.
- Test large CSS viewports, ordinary high-DPI screens, and high zoom separately. Keep canvas allocation bounded on huge displays. No screen-resolution formula can determine physical viewing distance, so the design must preserve user zoom and readable defaults.

**Limits of this investigation**

This establishes the main architectural causes and concrete rendered defects. It is not a completed cross-browser audit. The layout sweep did not exhaust every expanded article, modal, hover state, map interaction, theme/language combination, real keyboard, or browser zoom setting. The four-language focused check covered the home heading. Broader acceptance testing belongs to the implementation stages above. No application tests or build were rerun for this documentation-only change.

The requested outcome is achievable with three overall modes and continuous, bounded sizing inside them. The first implementation priority is the shared transform/mode/typography foundation; every later component improvement depends on getting that relationship right.
