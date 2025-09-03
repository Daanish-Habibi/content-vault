from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.entrypoints.http.routers.search import router as search_router

app = FastAPI(title="Content Vault")

# allow only dev environment for now
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"ok": True}

app.include_router(search_router, prefix="/api")