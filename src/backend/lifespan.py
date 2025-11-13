import os
from contextlib import asynccontextmanager
from typing import AsyncIterator
import uuid

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
        await _ensure_admin_user()
        yield


@asynccontextmanager
async def _connect_pool() -> AsyncIterator[asyncpg.Pool]:
    dsn = os.environ.pop("BACKEND_DB_URI")
    async with asyncpg.create_pool(dsn, min_size=1, max_size=3) as pool:
        yield pool


async def _ensure_admin_user() -> None:
    from .auth import password_hash

    user = os.environ.pop("BACKEND_ADMIN_USER")
    password = os.environ.pop("BACKEND_ADMIN_PASS")

    async with acquire() as conn:
        account_id = await conn.fetchval(
            "INSERT INTO account (name) VALUES ($1) ON CONFLICT DO NOTHING "
            "RETURNING account_id",
            user,
        )
        if account_id is None:
            return  # Account already exists

        await conn.execute(
            "UPDATE account_login SET password = $1 WHERE account_id = $2",
            password_hash.hash(password),
            account_id,
        )
