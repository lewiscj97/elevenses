# Learning log

## Date: 05/10/26
### Task: Initial project setup

## Date: 05/10/26
### Task: Issue #1, Docker Compose skeleton (AI agent: Claude Sonnet 5.5)

**What worked**
- Planning first paid off. The plan surfaced a rule conflict (CLAUDE.md says to update the Commands section, but also forbids editing CLAUDE.md without instruction in the issue) before any code was written, and the owner resolved it with a follow-up issue.
- Checking every dependency's last release date up front, as CLAUDE.md requires, meant no rework later.
- Testing for real (build, curl both services, edit a file in each, watch it reload, `docker compose down`) caught more than reading the code would have.

**Where the agent went wrong or nearly did**
- `.gitignore` had `.env.*`, which silently ignores `.env.example`. Found by thinking about it before committing, not by a failing check. Fixed with a `!.env.example` exception.
- Docker commands built from `$PWD` or `id -u` were refused by the harness's worktree safety check. Literal paths and IDs worked. Worth knowing when scripting Docker from an isolated agent session.
- TypeScript 7.0.2 was published the same day. It worked here (typecheck and build pass), but a brand-new major version is worth watching.

**Instructions that helped**
- "Explain why you're doing things" and the explicit Definition of done made it clear what to verify and report.
- Treating the issue's out-of-scope list as a hard boundary kept this to a skeleton: no health endpoint, tests, linting or CI.

**Decision recorded**
- Frontend runs on port 3000, not the 5173 named in the issue, at the owner's request. Backend stays on 8000.
