import datetime
import os
from typing import Annotated
from uuid import UUID

import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from backend.auth import password_hash
from backend.dependencies import ConnectionTransaction

JWT_SECRET = os.environ.pop("BACKEND_JWT_SECRET")
JWT_REFRESH_SECRET = os.environ.pop("BACKEND_JWT_REFRESH_SECRET")

router = APIRouter(prefix="/auth")


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    sub: str
    token_type: str


class RefreshToken(BaseModel):
    refresh_token: str


@router.post("/token")
async def token(
    conn: ConnectionTransaction,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> TokenResponse:
    """Request a JSON Web Token for the given username and password."""
    unauthorized_error = HTTPException(
        401,
        "Incorrect username or password",
        {"WWW-Authenticate": "Bearer"},
    )

    row = await conn.fetchrow(
        "SELECT account_id, password FROM account "
        "JOIN account_login USING (account_id) "
        "WHERE name = $1",
        form_data.username,
    )
    if row is None:
        raise unauthorized_error

    valid, updated_hash = password_hash.verify_and_update(
        form_data.password, row["password"]
    )
    if not valid:
        raise unauthorized_error

    if updated_hash:
        await conn.execute(
            "UPDATE account_login SET password = $1 WHERE account_id = $2",
            updated_hash,
            row["account_id"],
        )

    return generate_token_response(row["account_id"])


@router.post("/token/refresh")
async def refresh(data: RefreshToken) -> TokenResponse:
    """Request a JSON Web Token with the given refresh token."""

    def fail_unauthorized(detail: str):
        raise HTTPException(401, detail, {"WWW-Authenticate": "Bearer"})

    try:
        payload = jwt.decode(
            data.refresh_token,
            JWT_REFRESH_SECRET,
            ["HS256"],
            options={"require": ["sub", "exp", "iat"]},
        )
    except jwt.ExpiredSignatureError:
        return fail_unauthorized("Token expired")
    except jwt.InvalidTokenError:
        return fail_unauthorized("Invalid token")

    return generate_token_response(payload["sub"])


def generate_token_response(account_id: str | UUID) -> TokenResponse:
    now = utcnow()
    sub = str(account_id)  # str(uuid) for serialization
    access_token = jwt.encode(
        {"sub": sub, "exp": now + datetime.timedelta(minutes=15), "iat": now},
        JWT_SECRET,
        "HS256",
    )
    # DANGER: this will not revoke the previous refresh token!
    refresh_token = jwt.encode(
        {"sub": sub, "exp": now + datetime.timedelta(hours=1), "iat": now},
        JWT_REFRESH_SECRET,
        "HS256",
    )
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        sub=sub,
        token_type="Bearer",
    )


def utcnow() -> datetime.datetime:
    return datetime.datetime.now(datetime.timezone.utc)
