# Small feature documentation

Verified: 2026-10-06 against the five pilot entries in the [feature index](../README.md#find-a-feature) and [path checker](../../npm/validate-docs.js). This is a maintenance workflow, not a generated application specification.

Start with the index's descriptions and aliases when the user's wording is unfamiliar. Search by purpose as well as name; aliases need not include every typo. Read one linked topic and its owning source before editing. Add useful new wording encountered during real tasks.

Use the template below for a new feature, or a short section in an existing topic. Give it a stable ID independent of its display text. Keep each accepted rule in one canonical place and link from shared layout/Home guidance. Do not create a page for every component.

```markdown
# Ordinary feature name

Feature ID: `stable-id`. Search names: common phrases and previous labels.
Purpose and route: one sentence describing what visitors can do.
Verified: date, sources/observations checked, and important unverified scope.

## Accepted behavior

- Three to six rules to preserve, including user-rejected alternatives where relevant.

## Ownership and dependencies

| Owner link | Role / when to read it |
|---|---|
| Link to the real authoring source | Behavior, content, styling, mounting or shared layout authority |

## Issues and proposals

Only if needed: separate a confirmed defect from an unapproved idea.
Do not repeat the whole contract as a second current-behavior section.

## Focused verification

Three to five actions, expected outcomes and useful viewport/input/theme cases.
These are instructions for the next change, not claims of completed checks.
```

During the same change, revise only affected rules, aliases, owner links and verification scope. No separate user reminder is needed. If code disagrees with an accepted rule, investigate the discrepancy; do not silently turn the defect into the specification. Move finished task records to the archive after promoting lasting knowledge.

Run `npm run validate:docs` to check current local links, including linked owner paths. For a narrow edit, use `npm run validate:docs -- docs/architecture/startup-guide.md`. CI runs the current-document scan. The checker does not verify heading anchors, external URLs or prose; archives/work/evidence/tmp are excluded except their routing READMEs. Explicit file arguments allow checking a historical record when needed. Do not stamp an entire document as verified after a check of one paragraph.
