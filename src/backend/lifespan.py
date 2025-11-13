import os
from contextlib import asynccontextmanager
from typing import AsyncIterator

import asyncpg
from fastapi import FastAPI

_pool: asyncpg.Pool | None = None


@asynccontextmanager
async def acquire() -> AsyncIterator[asyncpg.Connection]:
    if _pool is None:
        raise RuntimeError("Database pool not initialized")

    async with _pool.acquire(timeout=3) as conn:
        yield conn  # type: ignore


@asynccontextmanager
async def lifespan(app: FastAPI):
    global _pool

    async with _connect_pool() as _pool:
        yield


@asynccontextmanager
async def _connect_pool() -> AsyncIterator[asyncpg.Pool]:
    dsn = os.environ.pop("BACKEND_DB_URI")
    async with asyncpg.create_pool(dsn, min_size=1, max_size=3) as pool:
        yield pool
