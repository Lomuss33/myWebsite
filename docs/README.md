# Project documentation

Current documents describe implementation; archives explain history.

| Need | Read |
|---|---|
| Overview and setup | [README](../README.md) |
| Visitor behavior | [User guide](../USER_GUIDE.md) |
| Make a change | [Maintainer guide](../MAINTANER.md) |
| Data and component ownership | [Architecture](architecture/overview.md) |
| Layout and navigation | [Responsive layout](architecture/responsive-layout.md) |
| Finished Home behavior | [Home implementation](architecture/home.md) |
| Explore the edges / Explore the sidebar / navigation spotlight | [Startup navigation guide](architecture/startup-guide.md) |
| Content and extension tasks | [Maintenance](guides/maintenance.md) |
| Checks and deployment | [Validation](guides/validation.md) |
| Reasons behind tradeoffs | [Decisions](decisions/README.md) |
| Resume unfinished work | [Active work](work/README.md) |
| Older investigations | [Archive](archive/README.md) |
| Recorded measurements | [Evidence](evidence/README.md) |

## Find a feature

Match the description when your wording differs from the aliases. Read the linked contract, then its owner links; use `rg` on a likely alias or owner name if needed. Add useful phrases during real tasks, not a list of every possible typo.

| Feature and purpose | Search names | Contract and owners |
|---|---|---|
| Home navigation guide: highlights where visitors can navigate and change settings | Explore the edges, explore the sidebar, look around, navigation hint, spotlight, dimmed background | [Startup guide](architecture/startup-guide.md) |
| Career story rail: dragging an icon changes the story's position | Slider, drag rail, tractor handle, resistance, pull back to center | [Career rail](architecture/drag-interactions.md#career-story-rail) |
| Home name interactions: pull a lineage or move an animated name through its story | Name origins, tug, names chain, movable word, text flows around name | [Name dragging](architecture/drag-interactions.md#home-name-dragging) |
| Decorative bands: animated artwork separating sections and ending their pages | Decoration strip, bottom buffer, curtain, garden, shader, gradient only, sad-face background | [Decorative bands](architecture/decorative-bands.md) |
| Project stickers: floating cutouts follow project cards without changing spacing | Cutouts, corner artwork, overlapping stickers, top right, bottom left, software dark set | [Project stickers](architecture/project-stickers.md) |

Use the [short feature template and upkeep workflow](guides/feature-documentation.md) when adding or changing guidance. These five entries are a small starting set; expand when a real task needs it.

## Keeping documentation useful

Keep each fact in one current document and link to it elsewhere. Code/configuration is authoritative for implemented behavior; decisions record intent. Investigate disagreements rather than adopting an archived proposal.

Current technical documents carry a Verified date and scope. Update it after checking relevant sources or behavior; it does not certify every device. Historical evidence retains its original limits.

Update current guidance in the same change as behavior. Record enduring tradeoffs as decisions, not every CSS adjustment. Active tasks record findings and next steps. On completion, promote durable knowledge into current docs and archive the task.

## Temporary files

Use `docs/tmp/` for disposable screenshots, logs, and scripts; it is ignored except for its README. Retain compact reproducible results under `evidence/<date>-<topic>/` with command, revision, environment, and limitations. Never commit credentials or private browser profiles.

Run `npm run validate:docs` for current local links and linked owner paths; manually check commands, intent and current/historical labels. Documentation-only changes do not need an application build.
