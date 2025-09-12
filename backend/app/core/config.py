# app/core/config.py
import os
from pathlib import Path
from typing import List
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_ENV = BACKEND_ROOT / ".env.local"
ENV_FILE = os.getenv("ENV_FILE", str(DEFAULT_ENV))

class Settings(BaseSettings):
    PROJECT_NAME: str = "Content Vault"
    API_V1_PREFIX: str = "/api"
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    DEBUG: bool = True

    # REQUIRED (no default) — must come from env / .env.local
    JIKAN_BASE_URL: AnyHttpUrl

    # Optional defaults (can be overridden by env)
    JIKAN_USER_AGENT: str = "ContentVault/1.0"
    TIMEOUT_SECONDS: float = 20.0

    # Pydantic v2 style settings config
    model_config = SettingsConfigDict(
        env_file=ENV_FILE,
        env_file_encoding="utf-8",
        case_sensitive=True,
    )

settings = Settings()
