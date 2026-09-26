# Responsive composition and density

Status: accepted; recorded retrospectively 2026-09-11 from stakeholder direction and current source.

## Context

Earlier proposals removed shrinking and allowed landscape mobile fallbacks. Stakeholder review rejected inflated desktop content and landscape mobile composition.

## Decision

The original decision used portrait-only mobile selection, native desktop CSS zoom 0.8, bounded centered wide content with decorative gutters, and navigation priority over optional profile content on short screens. On 2026-09-26, the desktop zoom was superseded: retain the portrait-only mobile selection, the true 72rem centered desktop page cap and decorative gutters, and navigation priority on short screens, but express desktop density through explicit component sizing instead of global zoom.

## Consequences

Containers adapt within each mode. Desktop dimensions now remain their declared CSS sizes; responsive checks verify the 72rem page cap, centering, and real 44px control targets. Archived proposals must not reverse accepted behavior.

Sources: [current rules](../architecture/responsive-layout.md), [historical follow-ups](../archive/2026-09-responsive-sizing/verification.md).
