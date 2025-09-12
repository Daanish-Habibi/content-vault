from fastapi import Depends
from app.core.http import make_client
import httpx

async def get_http_client() -> httpx.AsyncClient:
    async with make_client() as client:
        yield client
