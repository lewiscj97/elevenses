# Learning log

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

## Date: 08/10/26
### Task: Issue #2, backend health endpoint and quality tooling (AI agent: Claude Code)

**What worked**
- Checking the 1-year dependency rule before writing code caught a stale dependency. `TestClient` needs an HTTP client, and the usual one, `httpx`, had not been released since December 2024. Instead of asking for an exception, the agent read Starlette's own `testclient.py` and found it now prefers `httpx2`, the maintained successor (released September 2026). It then checked PyPI, the upstream repo and Starlette's release notes before relying on it.
- Verifying against primary sources caught an overstatement. The agent first said Starlette had deprecated `httpx`, but the release notes never say so: the warning only exists in the code. It also showed that `httpx2` support needs Starlette 1.2 or later, so the plan gained a `starlette>=1.2` floor.
- Breaking the endpoint on purpose confirmed the test actually guards the behaviour, not just that it passes.

**Where the agent went wrong or nearly did**
- It overstated the deprecation claim before checking (see above). Owner and coordinator prompts to verify against primary sources fixed it before the PR.
- The cloud session's Docker could not build the image: Docker Hub rate-limited the base image pull, then pip inside the build rejected the session's HTTPS proxy certificate. `main` fails the same way there, so this is an environment limit, not this change. The checks ran natively on the same Python version (3.13.16) instead, and the in-container run moved to the owner's machine.

**Instructions that helped**
- "If a dependency hasn't been updated within 1 year, find an alternative or request permission" turned a routine test dependency into a real finding.
- The issue's instruction to put commands in the PR description sidestepped the CLAUDE.md editing conflict. Issue #5 owns updating that section.
