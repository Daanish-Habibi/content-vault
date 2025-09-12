from fastapi import APIRouter, Query
from app.services.stats_service import get_totals

router = APIRouter(prefix="/stats", tags=["stats"])

@router.get("")
async def stats(force_refresh: bool = Query(False)):
    return await get_totals(force_refresh=force_refresh)