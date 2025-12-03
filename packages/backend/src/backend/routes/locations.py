from fastapi import APIRouter, HTTPException

from backend.dependencies import AccountID, ConnectionTransaction
from backend.models import Location

router = APIRouter(prefix="/locations")


@router.get("")
async def get_locations(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> list[Location]:
    """Get a list of all locations."""
    rows = await conn.fetch("SELECT * FROM location ORDER BY location_id")
    return [Location.model_validate(dict(row)) for row in rows]


@router.get("/{location_id}")
async def get_location(
    account_id: AccountID,
    conn: ConnectionTransaction,
    location_id: int,
) -> Location:
    """Get a location by ID."""
    row = await conn.fetchrow(
        "SELECT * FROM location WHERE location_id = $1",
        location_id,
    )
    if row is None:
        raise HTTPException(404, "location not found")

    return Location.model_validate(dict(row))
