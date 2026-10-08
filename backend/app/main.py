from fastapi import FastAPI

from app.routes import health

app = FastAPI(title="elevenses")
app.include_router(health.router)
