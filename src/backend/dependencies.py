from typing import Annotated, AsyncIterator

import asyncpg
from fastapi import Depends

from backend import lifespan


async def acquire() -> AsyncIterator[asyncpg.Connection]:
    async with lifespan.acquire() as conn:
        yield conn


async def acquire_transaction() -> AsyncIterator[asyncpg.Connection]:
    async with lifespan.acquire_transaction() as conn:
        yield conn


Connection = Annotated[asyncpg.Connection, Depends(acquire)]
ConnectionTransaction = Annotated[asyncpg.Connection, Depends(acquire_transaction)]
