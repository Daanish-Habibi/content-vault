from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.logging import setup_logging
from app.api.errors import register_error_handlers
from app.entrypoints.http.routers.search import router as search_router
from app.entrypoints.http.routers.item import router as item_router
from app.entrypoints.http.routers.anime import router as anime_router
from app.entrypoints.http.routers.stats import router as stats_router

logger = setup_logging()

# allow only dev environment for now
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

def create_app() -> FastAPI:
    app = FastAPI(title="Content Vault")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(search_router, prefix="/api")
    app.include_router(item_router, prefix="/api")
    app.include_router(anime_router, prefix="/api")
    app.include_router(stats_router, prefix="/api")

    register_error_handlers(app)
    logger.info("App Started")
    return app

app = create_app()

@app.get("/health")
def health():
    return {"ok": True}