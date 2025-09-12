from typing import Optional
from fastapi import APIRouter
from app.services.jikan_service import jikan_get

router = APIRouter(prefix="/anime", tags=["anime"])

# path: /api/anime
@router.get("/")
async def get_anime(
    q: Optional[str] = None,
    page: int = 1,
    order_by: Optional[str] = None,
    sort: Optional[str] = None,
    status: Optional[str] = None,
    limit: int = 24,
):
    params = {"page": page, "limit": limit}
    if q: params["q"] = q
    if order_by: params["order_by"] = order_by
    if sort: params["sort"] = sort
    if status: params["status"] = status

    return await jikan_get("/anime", params=params)
