import httpx
from typing import Any, Dict, Optional
from app.core.config import settings

_headers = {"User-Agent": settings.JIKAN_USER_AGENT}
_BASE = str(settings.JIKAN_BASE_URL).rstrip("/")

async def jikan_get(path: str, params: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
    rel_path = path.lstrip("/")

    async with httpx.AsyncClient(
        base_url=_BASE + "/",
        timeout=settings.TIMEOUT_SECONDS,
        headers=_headers,
    ) as client:
        r = await client.get(rel_path, params=params)
        r.raise_for_status()
        return r.json()