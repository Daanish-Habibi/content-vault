from typing import Optional, List
from pydantic import BaseModel, HttpUrl

class ContentItem(BaseModel):
    id: int
    title: str
    image: Optional[HttpUrl] = None
    score: Optional[float] = None
    year: Optional[int] = None

class SearchResponse(BaseModel):
    query: str
    count: int
    items: list[ContentItem]