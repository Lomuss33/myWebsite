# Active work

No documentation migration task remains after 2026-09-11. Pending photos and product limitations are in [Home](../architecture/home.md) and [validation](../guides/validation.md#known-gaps).

The proposed post-audit maintenance and upgrade sequence is in [Project maintenance roadmap](2026-09-30-project-maintenance-roadmap.md).

The [Firefox decoration investigation](2026-10-05-firefox-decoration-context.md) records direct Windows 11 Firefox diagnostics showing available WebGL 2 alongside graphics-device/shared-context failures. Original-renderer startup retries, context recovery, buffer limits and deployment serialization are complete locally and unpublished. Firefox recovery verification has not been performed; new fallbacks are explicitly excluded.

The 14-image Software project sticker collection now uses the former dark-mode artwork and one shared palette in every theme. The separate light set has been removed. Its completed [implementation record](2026-10-04-software-stickers-plan.md) describes the revision-5 artwork, shared vector ownership, preserved placement and verified folder cleanup. Public exports contain only the current set; [historical revisions](../archive/stickers/software/README.md) remain outside published assets. Current ownership is in the responsive layout and maintenance guides.

Create `YYYY-MM-DD-topic.md` for multi-step work with:

- Status: proposed / active / blocked / complete
- Objective, scope, owner or responsible role
- Source files and verified findings
- Decisions and completed work
- Next concrete step and remaining checks
- Evidence links and last-updated date

Keep it brief enough to resume without chat history. Promote lasting knowledge to current docs, then archive completed tasks. Disposable experiments belong in [tmp](../tmp/README.md).
