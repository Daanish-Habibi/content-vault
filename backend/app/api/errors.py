from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import httpx, logging

logger = logging.getLogger("anivault")

def register_error_handlers(app: FastAPI):
    @app.exception_handler(httpx.HTTPError)
    async def http_error_handler(_: Request, exc: httpx.HTTPError):
        logger.exception("Upstream error: %s", exc)
        return JSONResponse({"detail": "Upstream error"}, status_code=502)
