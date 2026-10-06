# Drag interactions

Verified: 2026-10-06 by source review of the owners below and reconciliation with existing Home/responsive guidance. No new browser gesture checks or automated suite were run; physical-device smoothness remains unverified.

## Career story rail

Feature ID: `career-story-rail`. Search names: slider, drag rail, tractor handle, resistance, pull back to center.
Purpose and route: move the icon along the closing stories on `#experience`; the same controller handles pointer dragging, rail clicks/taps and keyboard movement.

Accepted behavior:

- Keep the full-width rail, fading at its outer ends and faintest in the middle, without endpoint dots or a progress overlay. Inset the handle by half its diameter plus 2px; its target retains a 52px minimum.
- Outward travel gets progressively slower near the ends and continues toward its target while the pointer holds still. Pulling toward the center follows immediately. Reversal rebases the pointer/handle gap; crossing the center applies resistance only in the new outward half.
- Grabbing the handle preserves the grab offset. Releasing finishes with a 120–420ms ease-out glide rather than snapping or freezing short.
- Touch waits for horizontal intent; vertical swipes scroll without changing the value. Ignore secondary pointers and cancel on capture loss, cancellation, blur, hiding or unmount.
- Arrow keys and Home/End act immediately. Reduced motion bypasses animated following. Pointer mapping accounts for a scaled rail; animation time advances from the previous frame rather than each pointer event.

| Owner | Role |
|---|---|
| [PretextDraggableInlineIconText.jsx](../../src/components/generic/PretextDraggableInlineIconText.jsx) | Pointer intent, inward/outward mapping, motion, keyboard and cancellation |
| [PretextDraggableInlineIconText.scss](../../src/components/generic/PretextDraggableInlineIconText.scss) | Rail, handle and target geometry |
| [ArticleText.jsx](../../src/components/articles/ArticleText.jsx), [ArticleText.scss](../../src/components/articles/ArticleText.scss) | Mounts draggable story text, localized axis/value descriptions and full story-rail styling |
| [pretextDraggableInlineFlow.js](../../src/components/generic/pretextDraggableInlineFlow.js) | Inline text parsing/layout shared with exclusions |
| [experience.json](../../public/data/sections/experience.json), [_experience-density.scss](../../src/styles/_experience-density.scss) | Localized stories and page-specific sizing |

Focused verification:

1. Drag outward, hold, reverse and cross the center; expect resistance only away from center and no reversal jump.
2. Click/tap the rail, grab the handle off-center and release; expect the preserved offset and short settling glide.
3. Try vertical touch scrolling, a second pointer, capture cancellation and window blur; expect no stuck gesture or unwanted value change.
4. Use arrows/Home/End and reduced motion; expect immediate response. Sample narrow portrait, landscape and wide desktop rails.

## Home name dragging

Feature ID: `home-name-dragging`. Search names: name origins, lineage tug, names chain, movable word, text flows around name.
Purpose and route: pull the lineage endpoints or move either animated display name through its story on `#about`. These are two related interactions with different gesture owners.

Accepted behavior:

- Only the first/last lineage names are handles, even after wrapping. Pulls use an 8px dead zone, 55% pointer travel and extra resistance near maximum extension. The start margin pulls the row sequence; its resting minimum height prevents upward copy jumps. Keep each arrow attached to the preceding name.
- Lineage touch handling retains vertical page scrolling. The display-name obstacle captures only its own area and moves in two dimensions within its story. It passes freely over the lineage.
- Swept contact with copy starts at 84% resistance, even on a fast move. Sustained pulling reduces it by 40% over three seconds to 50.4%; a new gesture resets it.
- Coalesce pointer updates to one frame. Measure obstacle bounds before writing the transform and pass the computed bounds to text reflow rather than measuring again afterward.
- Text may use either side of the obstacle; skip fully blocked bands without consuming text. Resting paragraphs retain semantic DOM, and reflowed copy has one accessible source. Release returns farther pulls more slowly; resizing resets the display-name interaction.

| Owner | Role |
|---|---|
| [ArticleNameOrigins.jsx](../../src/components/articles/ArticleNameOrigins.jsx), [ArticleNameOrigins.scss](../../src/components/articles/ArticleNameOrigins.scss) | Localized stories, endpoint lineage tug, resting height and composition |
| [DraggableTextObstacle.jsx](../../src/components/generic/DraggableTextObstacle.jsx) | Display-name capture, bounds, swept resistance, return and cleanup |
| [PretextObstacleText.jsx](../../src/components/generic/PretextObstacleText.jsx), [pretextDraggableInlineFlow.js](../../src/components/generic/pretextDraggableInlineFlow.js) | Paragraph exclusion/reflow and accessible source |
| [_home-hero.scss](../../src/styles/_home-hero.scss), [Home layout constraints](home.md#constraints-learned) | Density and container-based header composition |

Focused verification:

1. Pull each lineage endpoint before/after wrapping; expect no extra handles, separated arrows or upward copy jump.
2. Move each display name slowly and quickly through copy, hold the drag for three seconds, then start again; expect resistance to ease and reset.
3. Cover a whole text band, move away and release; expect no missing/duplicated words and restored semantic paragraphs.
4. Try vertical lineage swipes, display-name touch dragging, resize and interrupted capture; expect page scrolling outside the obstacle and a clean reset.

Issues and scope: the historical Pages/local mismatch was a deployment-state discrepancy, not a separate drag implementation. This source review does not certify current production markup. Performance on a physical phone still needs observation; do not weaken accepted interactions to address an unmeasured slowdown.
