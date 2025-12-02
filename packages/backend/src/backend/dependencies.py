from __future__ import annotations

from typing import Annotated, AsyncIterator
from uuid import UUID

import asyncpg
import jwt
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from backend import lifespan


class AccountModel(BaseModel):
    account_id: UUID
    name: str


async def acquire() -> AsyncIterator[asyncpg.Connection]:
    async with lifespan.acquire() as conn:
        yield conn


async def acquire_transaction() -> AsyncIterator[asyncpg.Connection]:
    async with lifespan.acquire_transaction() as conn:
        yield conn


async def authenticated_account(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> AccountModel:
    row = await conn.fetchrow("SELECT * FROM account WHERE account_id = $1", account_id)
    if row is None:
        raise HTTPException(404, "account not found")
    return AccountModel.model_validate(dict(row))


async def authenticated_account_id(
    token: Annotated[str, Depends(OAuth2PasswordBearer(tokenUrl="auth/token"))],
) -> UUID:
    def fail_unauthorized(detail: str):
        raise HTTPException(401, detail, {"WWW-Authenticate": "Bearer"})

    from backend.routes.auth import JWT_SECRET

    try:
        payload = jwt.decode(
            token,
            JWT_SECRET,
            ["HS256"],
            options={"require": ["sub", "exp", "iat"]},
        )
    except jwt.ExpiredSignatureError:
        return fail_unauthorized("Token expired")
    except jwt.InvalidTokenError:
        return fail_unauthorized("Invalid token")

    return UUID(payload["sub"])


Account = Annotated[AccountModel, Depends(authenticated_account)]
AccountID = Annotated[UUID, Depends(authenticated_account_id)]
Connection = Annotated[asyncpg.Connection, Depends(acquire)]
ConnectionTransaction = Annotated[asyncpg.Connection, Depends(acquire_transaction)]
