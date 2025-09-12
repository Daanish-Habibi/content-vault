# app/core/http.py
import httpx
from app.core.config import settings

def make_client(base_url: str | None = None) -> httpx.AsyncClient:
    return httpx.AsyncClient(
        base_url=base_url,
        timeout=settings.TIMEOUT_SECONDS,            # e.g., 20.0
        headers={"User-Agent": settings.JIKAN_USER_AGENT},  # reuse your UA
        # optional nice-to-haves
        # http2=True,
        # limits=httpx.Limits(max_connections=100, max_keepalive_connections=20),
    )
