from fastapi import APIRouter, HTTPException, Query
import httpx
from app.core.models import ContentItem, SearchResponse

router = APIRouter(tags=["content"])
JIKAN_SEARCH = "https://api.jikan.moe/v4/anime"

@router.get("/search", response_model=SearchResponse)
async def search(
                q: str = Query(..., min_length=1, description="Search text"),
                limit: int = Query(12, ge=1, le=50, description="Items to return"),
            ):
    """
    Search for Content by query and return a normalized minimal shape
    """

    if not q.strip():
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

    return SearchResponse(query=q, count=len(items), items=items)