from fastapi import APIRouter, HTTPException
import httpx
from app.core.models import ContentDetail

router = APIRouter(tags=["content"])
JIKAN_DETAIL = "https://api.jikan.moe/v4/anime/{id}/full"

@router.get("/item/{id}", response_model=ContentDetail)
async def get_item(id: int):
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            r = await client.get(JIKAN_DETAIL.format(id=id))
            r.raise_for_status()
            payload = r.json()
    except httpx.HTTPError as e:
        raise HTTPException(status_code=502, detail=f"Upstream error: {e!s}")

    data = (payload or {}).get("data") or {}
    img = (data.get("images", {}).get("jpg", {}) or {}).get("image_url")
    trailer_url = (data.get("trailer", {}) or {}).get("url")

    return ContentDetail(
        id=data.get("mal_id"),
        title=data.get("title"),
        image=img,
        score=data.get("score"),
        year=data.get("year"),
        synopsis=data.get("synopsis"),
        episodes=data.get("episodes"),
        genres=[g.get("name") for g in data.get("genres", []) if g.get("name")],
        trailer=trailer_url,
    )
