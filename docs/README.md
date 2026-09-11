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
| Content and extension tasks | [Maintenance](guides/maintenance.md) |
| Checks and deployment | [Validation](guides/validation.md) |
| Reasons behind tradeoffs | [Decisions](decisions/README.md) |
| Resume unfinished work | [Active work](work/README.md) |
| Older investigations | [Archive](archive/README.md) |
| Recorded measurements | [Evidence](evidence/README.md) |

## Keeping documentation useful

Keep each fact in one current document and link to it elsewhere. Code/configuration is authoritative for implemented behavior; decisions record intent. Investigate disagreements rather than adopting an archived proposal.

Current technical documents carry a Verified date and scope. Update it after checking relevant sources or behavior; it does not certify every device. Historical evidence retains its original limits.

Update current guidance in the same change as behavior. Record enduring tradeoffs as decisions, not every CSS adjustment. Active tasks record findings and next steps. On completion, promote durable knowledge into current docs and archive the task.

## Temporary files

Use `docs/tmp/` for disposable screenshots, logs, and scripts; it is ignored except for its README. Retain compact reproducible results under `evidence/<date>-<topic>/` with command, revision, environment, and limitations. Never commit credentials or private browser profiles.

Documentation-only validation checks relative links, paths, commands, and current/historical labels. It does not need an application build unless runtime files change.
