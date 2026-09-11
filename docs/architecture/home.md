# Home implementation and handoff

Verified: 2026-09-11 against source and recent focused checks. The Home design is accepted; preserve it while fixing concrete defects.

Route: `#about`. Data: [home.json](../../public/data/sections/home.json). Registry/order: [SectionBody.jsx](../../src/components/sections/SectionBody.jsx). Name origins precedes the human stack at the end.

| Area | Owner | Behavior |
|---|---|---|
| Contact band | `ArticleInlineList.jsx` | Full, compact address/number, short, icon labels; measured equal-width slots |
| Profile stack | `ArticleFeature.jsx` | Two photos, three placeholders; click/Enter/Space cycles; spread uses available media space |
| Intro text | `PretextInteractiveText.jsx` | Measured animated lines; refresh typography on width changes |
| Skill proof | `ArticleInfoList.jsx` | Stable cards, in-card details, Escape dismissal, scroll for long text |
| Name origins | `ArticleNameOrigins.jsx/.scss` | Native paragraphs around animated names; narrow-screen stacking |
| Human stack | `ArticleStack.jsx` | Half-outside circles, neighbor clearance, distinct hover/pinned states |

## Constraints learned

- Ordinary wrapping overrides on animated measured lines caused overlap. Change measured width/font instead.
- Intro text must not resize to fill portrait height.
- `public/images/profile-placeholder.png` is the future-photo/error fallback. Stop retrying if that URL fails.
- Human-stack card widths must include outside-circle space; 100% width plus margin overlapped neighbors.
- Skill details must not expand the card/grid when opened; that alternative was rejected.
- Preserve accepted design during performance maintenance.

## Rendering reliability

[useImageStatus.js](../../src/hooks/useImageStatus.js) resets source status in a layout effect before child passive effects reconcile cached images. A later reset risks hiding a loaded image.

[Transitionable.jsx](../../src/components/capabilities/Transitionable.jsx) owns reveal timers locally with cleanup, so shared scheduler cancellation cannot strand invisible elements.

Idle Home floating frames release permanent 3D/will-change layers; active tilt remains. Intro faces do not require backface hiding. Weak-device disappearance still needs confirmation on the stakeholder's hardware.

## Handoff

No redesign is pending. Three placeholders await replacement photos. Recent checks sampled four viewport/theme/language combinations, popup keyboard dismissal, cached reload/scroll visibility, and failed-placeholder loading. They were ad hoc checks, not a permanent full-device suite. See [known gaps](../guides/validation.md#known-gaps).
