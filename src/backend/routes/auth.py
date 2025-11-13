import datetime
import os
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel

from backend.auth import password_hash
from backend.dependencies import ConnectionTransaction

JWT_SECRET = os.environ.pop("BACKEND_JWT_SECRET")

router = APIRouter(prefix="/auth")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


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

    now = utcnow()
    payload = {
        "sub": str(row["account_id"]),  # str(uuid) for serialization
        "exp": now + datetime.timedelta(minutes=15),
        "iat": now,
    }
    token = jwt.encode(payload, JWT_SECRET, "HS256")
    return TokenResponse(access_token=token, token_type="Bearer")


def utcnow() -> datetime.datetime:
    return datetime.datetime.now(datetime.timezone.utc)
