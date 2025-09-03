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

class ContentDetail(ContentItem):
    synopsis: Optional[str] = None
    episodes: Optional[int] = None
    genres: List[str] = []
    trailer: Optional[HttpUrl] = None