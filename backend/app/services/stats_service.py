# app/services/stats_service.py
import time
import math
from typing import Dict, Any, Optional
from app.services.jikan_service import jikan_get

_TTL_SECONDS = 60
_cache: Optional[Dict[str, Any]] = None
_exp_at: float = 0.0

async def _total(resource: str, **params) -> int:
    # Ask for 1 item and read the pagination totals Jikan returns
    data = await jikan_get(f"/{resource}", params={"limit": 1, **params})
    pag = data.get("pagination") or {}
    items = pag.get("items") or {}
    total = items.get("total") or pag.get("total") or 0

    if total < 0:
        raise ValueError("count must be non-negative")
    if total < 100:
        return (total // 10) * 10
    if total < 1000:
        return (total // 100) * 100
    # two significant digits, zero the rest
    digits = len(str(total))          # avoids float log issues
    factor = 10 ** (digits - 2)   # e.g., 12345 -> 10^(5-2)=1000
    return (total // factor) * factor

    # return (n // factor) * factor

async def _compute() -> Dict[str, Any]:
    return {
        "anime_total": await _total("anime", unapproved="false"),
        "manga_total": await _total("manga", unapproved="false"),
        "characters_total": await _total("characters"),
        "cached": False,
    }

async def get_totals(*, force_refresh: bool = False) -> Dict[str, Any]:
    global _cache, _exp_at
    now = time.time()
    if not force_refresh and _cache is not None and now < _exp_at:
        return _cache

    data = await _compute()
    _cache = data
    _exp_at = now + _TTL_SECONDS
    return data
