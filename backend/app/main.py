from fastapi import FastAPI
from app.entrypoints.http.routers.search import router as search_router

app = FastAPI(title="Content Vault")

@app.get("/health")
def health():
    return {"ok": True}

app.include_router(search_router, prefix="/api")