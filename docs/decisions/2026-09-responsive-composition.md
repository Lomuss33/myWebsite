# Responsive composition and density

Status: accepted; recorded retrospectively 2026-09-11 from stakeholder direction and current source.

## Context

Earlier proposals removed shrinking and allowed landscape mobile fallbacks. Stakeholder review rejected inflated desktop content and landscape mobile composition.

## Decision

Use portrait-only mobile selection, native desktop CSS zoom 0.8, bounded centered wide content with decorative gutters, and navigation priority over optional profile content on short screens.

## Consequences

Containers adapt within each mode. Rendered desktop targets are smaller than CSS declarations; tests must measure actual geometry and disclose that tradeoff. Archived proposals must not reverse accepted behavior.

Sources: [current rules](../architecture/responsive-layout.md), [historical follow-ups](../archive/2026-09-responsive-sizing/verification.md).
