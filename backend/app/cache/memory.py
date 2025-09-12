# super-simple in-process TTL cache usable anywhere
import time
from typing import Any, Callable, Dict, Optional, Tuple

_store: Dict[str, Tuple[float, Any]] = {}   # key -> (expires_at, value)

def get(key: str) -> Optional[Any]:
    item = _store.get(key)
    if not item:
        return None
    exp, val = item
    if time.time() >= exp:
        _store.pop(key, None)               # expired -> remove
        return None
    return val

def set(key: str, value: Any, ttl_seconds: int) -> None:
    _store[key] = (time.time() + ttl_seconds, value)

def delete(key: str) -> None:
    _store.pop(key, None)

def cached_call(
    key: str,
    ttl_seconds: int,
    compute: Callable[[], Any],
    *,
    force_refresh: bool = False,
) -> Any:
    """General-purpose: return cached value or compute() and store."""
    if not force_refresh:
        hit = get(key)
        if hit is not None:
            return hit
    value = compute()
    set(key, value, ttl_seconds)
    return value
