from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(tags=["content"])

JIKAN_SEARCH = "https://api.jikan.moe/v4/anime"

@router.get("/search")
async def search(q: str, limit: int = 12):
    """
    Search for Content by query and return a normalized minimal shape
    """

    if not q or not q.strip():
        raise HTTPException(status_code=400, detail="Query parameter 'q' is required")
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            r = await client.get(JIKAN_SEARCH, params={"q": q, "limit": limit})
            r.raise_for_status()
            payload = r.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e!s}")
    
    items = []
    for it in payload.get("data", []):
        img = (it.get("images", {}).get("jpg", {}) or {}).get("image_url")
        items.append({
            "id": it.get("mal_id"),
            "title": it.get("title"),
            "image": img,
            "score": it.get("score"),
            "year": it.get("year"),
        })

    return {"query": q, "count": len(items), "items": items}