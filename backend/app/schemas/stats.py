from pydantic import BaseModel

class StatsTotals(BaseModel):
    anime_total: int
    manga_total: int
    characters_total: int
    cached: bool
