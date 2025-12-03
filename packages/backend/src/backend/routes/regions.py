from fastapi import APIRouter, HTTPException

from backend.dependencies import AccountID, ConnectionTransaction
from backend.models import Region

router = APIRouter(prefix="/regions")


@router.get("")
async def get_regions(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> list[Region]:
    """Get a list of all regions."""
    rows = await conn.fetch("SELECT * FROM region ORDER BY region_id")
    return [Region.model_validate(dict(row)) for row in rows]


@router.get("/{region_id}")
async def get_region(
    account_id: AccountID,
    conn: ConnectionTransaction,
    region_id: int,
) -> Region:
    """Get a region by ID."""
    row = await conn.fetchrow(
        "SELECT * FROM region WHERE region_id = $1",
        region_id,
    )
    if row is None:
        raise HTTPException(404, "region not found")

    return Region.model_validate(dict(row))
