from fastapi import APIRouter, HTTPException

from backend.dependencies import AccountID, ConnectionTransaction
from backend.models import Country

router = APIRouter(prefix="/countries")


@router.get("")
async def get_countries(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> list[Country]:
    """Get a list of all countries."""
    rows = await conn.fetch("SELECT * FROM country ORDER BY country_id")
    return [Country.model_validate(dict(row)) for row in rows]


@router.get("/{country_id}")
async def get_country(
    account_id: AccountID,
    conn: ConnectionTransaction,
    country_id: str,
) -> Country:
    """Get a country by ID."""
    row = await conn.fetchrow(
        "SELECT * FROM country WHERE country_id = $1",
        country_id,
    )
    if row is None:
        raise HTTPException(404, "country not found")

    return Country.model_validate(dict(row))
