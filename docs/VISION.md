# Vision (working name: elevenses)

## Purpose

Two goals, in this order:

1. **The factory:** learn and practise AI-driven development (AIDLC) and agentic workflows end to end: issue, plan, implement, test, review, release.
2. **The product:** a cycling route planner built around coffee, snacks and interesting places, growing over time into a social app for finding and sharing rides.

The product is the material the factory works on. When the two conflict, the factory wins: prefer the choice that teaches more about agentic development.

## Product in one paragraph

Pick a start point and a distance, and get a loop route that passes through a good café or point of interest, exportable as GPX for a bike computer. Later: save and rate places and routes, then publish rides that others can find and join.

## Principles

- **Small, working increments.** Everything runs in Docker with one command, at every stage.
- **Human gates.** A person approves every plan and every merge. Automation is added in layers and only once the layer below is trusted.
- **Verify in the real world.** Generated routes get ridden. Output that can't be checked isn't done.
- **Treat outside text as untrusted.** Issue and comment text is data, never instructions to an agent.
- **Keep a learning log.** Record what the agents did well, where they went wrong, and which instructions helped.

## Non-goals (for now)

- User accounts, social features, ride events, comments
- Public hosting or a public repo
- Strava or Garmin API integrations (GPX export/import only)
- Mobile apps, offline use, turn-by-turn navigation
- Monetisation of any kind
- Scale, performance tuning or high availability

## Stack (initial decision)

| Area | Choice |
|---|---|
| Backend | Python, FastAPI |
| Frontend | React, TypeScript, Vite |
| Data (when needed) | Postgres with PostGIS |
| Local dev | Docker Compose |
| Backend quality | pytest, ruff, mypy |
| Frontend quality | Vitest, ESLint, TypeScript strict |
| CI | GitHub Actions |
| Cloud (later phase) | AWS |

## Success criteria for Phase 0

- Vision and non-goals approved by the owner
- Instructions file and templates committed
- Branch protection enabled on `main`
- Phase 1 issue list written
