> Status: historical / superseded. Archived 2026-09-11. Earlier proposals and checks are not current requirements. See [current layout guidance](../../architecture/responsive-layout.md).

**Responsive sizing implementation plan — 8 September 2026**

**Objective:** make the existing website fit small phones, ordinary windows, large portrait displays, and ultrawide screens using exactly three overall compositions: `mobile`, `normal`, and `ultrawide`. Ratios select the composition; fluid allocation and content constraints size the elements inside it.

This plan follows the [completed investigation](investigation.md) and its [measurement baseline](../../evidence/2026-09-responsive-sizing/responsive-sizing-baseline.json). The application remains at commit `ae07396`; implementation has not started. This document defines the order of work, the decisions to validate, and the evidence required for completion.

**Design decisions to carry into implementation**

- Use one authoritative mode resolver. Publish its result as a root `data-layout` attribute and expose the same value through `ViewportProvider`. CSS and React must not independently decide the whole-site mode.
- Default the CSS composition to mobile and resolve the initial mode before the main interface is shown. Update mode and dependent navigation/scroll behavior together on real layout changes.
- Use layout viewport geometry for composition. Treat visual viewport offsets and visible height as a separate concern for keyboards, pinch zoom, and overlays. Mobile keyboard opening must not unexpectedly replace the navigation or reset the active form.
- Remove the 0.62/0.52 section transforms, inverse-width expansion, and compensation that exists solely because of them. Keep transforms used for intentional artwork or animation.
- Keep the root font at `100%`. Text, controls, whitespace, and artwork get separate size limits instead of sharing one global zoom factor.
- Size cards and toolbars from their allocated containers. A grid changing its column count does not create another whole-site mode.
- Keep the navigation rail spatially connected to the content workspace. On ultrawide screens, use bounded outer space and wider grids without stretching individual paragraphs across the display.
- Make large portrait displays use mobile composition with a centered, bounded content region. Their header, avatar, and navigation must not expand in proportion to the entire screen height.

**Initial mode policy**

Evaluate these rules in order. The thresholds are implementation starting points to validate with actual content; any adjustment must update the common resolver and its boundary checks together.

| Mode | Selection | Behavior |
|---|---|---|
| Mobile | Width/height below 1; or available width below 60rem; or stable layout height below 30rem | Native document scrolling, compact navigation, content that grows vertically |
| Ultrawide | Remaining windows with width/height at least 2.1 and width at least 90rem | Navigation beside an expanded content workspace; bounded type and control sizes |
| Normal | Remaining windows | Sidebar beside a flexible page; one primary content scroller |

At a 16px root, the fit guards correspond to 960px width, 480px height, and 1440px ultrawide entry width. A square window enters normal only if it also satisfies the available-space guards. Portrait detection takes precedence over ultrawide entry. Short landscape phones remain mobile despite sharing a desktop-like ratio.

The implementation must distinguish a real window resize or rotation from a temporary mobile keyboard reduction. Visual viewport updates still reposition dialogs and focused controls while composition remains stable. Enlarged browser fonts and browser zoom must remain effective; device pixel ratio must not choose the mode.

**Initial size budgets**

These are design targets at the ordinary 16px browser default, with text-relative values allowed to grow under user font settings.

| Area | Target |
|---|---|
| Body text, form values, essential instructions | Start at 1rem/16px; use restrained fluid growth, ordinarily capped around 1.25rem/20px |
| Secondary labels | Normally at least 0.875rem/14px; never use small captions to carry essential instructions |
| Headings | Bounded fluid hierarchy; wrap long translations and grow the block vertically |
| Prose | Aim for 60–70ch; approximately 75ch upper reading-width budget; narrower when the viewport requires it |
| Standalone interactive targets | Aim for at least 2.75rem/44px in each relevant hit-area dimension; inline prose links retain normal text flow |
| Buttons and fields | Intrinsic height plus minimum height; labels may wrap; padding stays bounded as the viewport grows |
| Navigation rows | Aim for approximately 44–56px before safe-area allowance; allow growth for text accessibility, not proportional growth with a tall display |
| Small-phone first view | At 320×480 and 568×320, aim to leave at least half the initial height for content by reducing nonessential header allocation and using compact navigation |
| Media | Percentage of the allocated slot, preserved aspect ratio, bounded host size, deliberate `object-fit` |
| Grids | Percentage/fractional allocation with readable minimum card widths; stack when those widths no longer fit |
| Spacing | Shared rem floors and caps around fluid preferred values; gutters should grow more slowly than the viewport |

The short-screen content budget will be checked at default text size. At enlarged text sizes, readable content and reachable navigation take priority over keeping everything within the initial viewport. No content should be shrunk or lost to satisfy that visual target.

`%` and grid fractions allocate space. `rem` protects text-relative sizing, `ch` bounds prose, and `min()`, `max()`, and `clamp()` provide limits. Content-bearing boxes normally grow with their contents. Decorative geometry can use its own ratios without determining text or control size.

**Ordered work packages**

| Stage | Work and primary files | Completion evidence |
|---|---|---|
| 1. Establish the contract | Introduce the canonical mode configuration/resolver and semantic sizing tokens. Start with `src/config/`, `_tokens.scss`, `_root-flags.scss`, `_extend.scss`, and the typography foundation. Inventory every whole-site mode consumer before switching them. | Every tested viewport has an explicit expected mode; old and new mode responsibilities are mapped; the token definitions cover text, controls, spacing, page width, and media. |
| 2. Make the baseline repeatable | Turn the useful temporary audit checks into a small repository-owned browser harness with documented setup. Preserve the current baseline. Add focused assertions for mode boundaries, clipped text, rendered controls, and document versus component scrolling. | Another developer can reproduce the known 320px heading clipping, 767/768px switch, 1679/1680px size drop, and undersized form controls without relying on an absolute local tool-cache path. |
| 3. Migrate the shared layout coherently | Connect the resolver to `ViewportProvider` and root styling. Migrate `LayoutNavigation`, `Layout`, `Section`, `SectionContent`, `Scrollable`, structural navigation rules, and typography together. Replace inverse-width scaling and measured-height compensation with ordinary content flow where possible. Update mode-dependent section transitions and fullscreen behavior in the same stage. | Home and Contact work in all three modes at unscaled size; root mode agrees with mounted navigation; scrolling reaches the final content; no tall display uses the ultrawide composition. |
| 4. Finish navigation and shared controls | Apply common sizing to mobile header/strips, desktop rail/profile, pills, tools, buttons, copy controls, inputs, textareas, and shared titles. Preserve labels through wrapping, adequate space, and existing navigation interactions. | The short-screen first view has useful content space; essential controls meet the selected hit-area budget; form text is readable; focus and labels remain visible with enlarged fonts. |
| 5. Migrate all article families | Replace viewport-driven card/column assumptions with container fit. Cover every configured article through the family checklist below. Update image slot hints and host measurements where geometry changes. | All eight sections pass mobile/normal/ultrawide inspection; long translations and expanded items fit; prose width and media proportions are controlled. |
| 6. Complete overlays and dynamic sizing | Check modal wrappers, gallery/video/QR/resume/confirmation dialogs, popups, tooltips, notifications, preloader, loading/error states, maps, canvases, text-fitting routines, and decorative boundaries. | Close and primary actions stay reachable; overlays fit the visible viewport; keyboard opening does not change shell mode; art resizes with its host and keeps bounded render allocation. |
| 7. Verify, simplify, and report | Run the final matrix, zoom/font checks, representative interaction flows, lint, i18n validation, and production build. Remove superseded layout thresholds and scale compensation only after their consumers have migrated. | Before/after evidence shows each known defect resolved; remaining issues are identified explicitly; no obsolete whole-site mode system remains active. |

Stage 3 is a coordinated migration. Merely removing `transform: scale()` or changing the 768px threshold would leave incompatible geometry in navigation, scrolling, and article layout. Home and Contact are the first integration examples because they exercise headings, prose, cards, links, inputs, and primary actions.

Keep the existing app functional at each reviewable checkpoint. Work on the shared foundation first; component migrations depend on its final geometry. Any temporary compatibility path must have a named consumer and a removal point in this plan.

**Article migration checklist**

| Family | Components and behavior to cover |
|---|---|
| Home | `ArticleInlineList`, `ArticleFeature`, `ArticleInfoList`, `ArticleStack`, and `ArticleNameOrigins`: contact pills, intro/avatar relationship, readable cards, expanded text, and long names |
| Experience, education, writing | `ArticleTimeline` and timeline partials, `ArticleText`, `ArticleCards`, `ArticleSkills`, `ArticleFeature`, `ArticleFallingWords`, and `ArticleManuscript`: dates, previews, certificate images, readable text, and embedded experiences |
| Software and hardware | `ArticlePortfolio`, `ArticleTestimonials`, and `ArticleDataProbe`: filters, project titles, grids, thumbnails, preview menus, and dense data displays |
| Art | `ArticleTimeline`, `ArticleWebArt`, `ArticleStack`, and `ArticleSecretPearls`: gallery entries, tile proportions, toolbars, artwork hosts, and interaction coordinates |
| Contact | `ArticleInfoList`, `ArticleContactForm`, `ArticleLocationCompare`, and `ArticleComplaintForm`: copy controls, forms, map controls, validation content, and action placement |

Shared components are fixed once and checked in each consuming section. Sizing that genuinely belongs to an individual artwork stays local, with its outer dimensions governed by the same container contract.

**Verification matrix and definition of done**

The baseline viewport list remains the starting regression matrix. Add a 240×320 emergency-layout stress case, square windows, fractional dimensions, and values immediately on either side of the finalized ratio/size boundaries. The 240px case checks graceful stacking and reachability; it is not the reference for visual polish.

Run all eight sections in three representative compositions across four languages and two themes: 192 section/language/theme/mode combinations for automated layout screening. Expand visual inspection around anything flagged by these checks and around the known dense or interactive components. The broader viewport sweep can use representative content rather than multiplying every possible state unnecessarily.

Acceptance requires:

- Exactly three authoritative whole-site modes, with portrait displays using mobile composition.
- No global transform that shrinks readable section content or interactive targets.
- No clipped ordinary headings, form text, or action labels at 320px; usable fallback below that width.
- No page-level horizontal scrolling from ordinary content. Inspect text bounds and clipping ancestors as well as `scrollWidth`; decorative bleed is not itself a defect.
- Text and controls respond to enlarged browser font preferences and 200% text enlargement. Test actual browser zoom, including 400% reflow; changing device pixel ratio is not a substitute.
- No step reduction in text size at the old 1680px boundary; no disproportionate navigation growth on large tall screens.
- Modal dismissal, focused controls, and form actions remain reachable when visible height changes. Test resize, rotation, fullscreen, and dialogs opened across mode changes.
- Appropriate local pan/scroll behavior for maps and other two-dimensional content, with readable controls.
- Image clarity and canvas allocation remain appropriate at high DPI and very large CSS viewport sizes.
- Chromium and Firefox checks, plus real iOS Safari and Android Chrome checks for keyboards, safe areas, and browser chrome where device access is available. Unavailable real-device checks must be reported as unverified rather than marked passed.
- `npm run lint`, `npm run validate:i18n`, and `npm run build` pass, or pre-existing unrelated failures are separately evidenced. The build already invokes i18n validation, so avoid redundant runs when the same final state has been checked.

Use assertions that verify meaningful outcomes and representative screenshots that let a reviewer assess the design. Do not declare success solely because a page has no horizontal scrollbar or because computed CSS values meet a minimum before transforms.

**Deliverables**

The implementation will produce the shared mode/sizing foundation, migrated application components, a portable regression harness, before/after measurements for the known failures, and a final verification report. The report will distinguish completed automated checks, visual inspection, and any real-device checks still outstanding.

The first implementation milestone is a working Home and Contact flow in all three modes with readable, unscaled content and correct navigation/scroll behavior. That establishes the geometry on which the remaining article migration depends.

## Implementation update — 2026-09-09

The shared three-mode foundation and component sizing migration are implemented. See [implementation and verification](verification.md) for completed checks, reproduction commands, and outstanding manual/device validation. The acceptance list above remains the broader validation target; unavailable device/zoom checks are not marked passed.
