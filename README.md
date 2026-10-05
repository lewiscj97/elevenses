# elevenses

Discover new routes.

See `docs/VISION.md` for further details.

## Quick start

Requires Docker with Compose.

```sh
docker compose up --build
```

| Service | URL |
|---|---|
| Backend (FastAPI) | http://localhost:8000/ |
| Frontend (React + Vite) | http://localhost:3000/ |

Edits under `backend/` and `frontend/` reload automatically. Stop everything with `docker compose down`.

Ports are published on `127.0.0.1` only. To change them, copy `.env.example` to `.env` and edit it (`.env` is git-ignored; never commit it).
