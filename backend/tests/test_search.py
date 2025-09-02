from fastapi.testclient import TestClient
import respx
from httpx import Response
from app.main import app
from app.entrypoints.http.routers.search import JIKAN_SEARCH

client = TestClient(app)

@respx.mock
def test_search_happy_path():
    # Mock Jikan response
    respx.get(JIKAN_SEARCH).mock(
        return_value=Response(
            200,
            json={
                "data": [
                    {
                        "mal_id": 1,
                        "title": "Demo Title",
                        "images": {"jpg": {"image_url": "https://example.com/img.jpg"}},
                        "score": 8.5,
                        "year": 2021,
                    }
                ]
            },
        )
    )
    r = client.get("/api/search", params={"q": "demo", "limit": 1})
    assert r.status_code == 200
    body = r.json()
    assert body["query"] == "demo"
    assert body["count"] == 1
    assert body["items"][0]["id"] == 1
    assert body["items"][0]["title"] == "Demo Title"