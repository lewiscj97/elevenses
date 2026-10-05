from fastapi import FastAPI

app = FastAPI(title="elevenses")


@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "elevenses backend is running"}
