from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.dependencies import AccountID, ConnectionTransaction

router = APIRouter(prefix="/departments")


class Department(BaseModel):
    department_id: int
    manager_id: int | None
    location_id: int


@router.get("")
async def get_departments(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> list[Department]:
    """Get a list of all departments."""
    rows = await conn.fetch("SELECT * FROM department ORDER BY department_id")
    return [Department.model_validate(dict(row)) for row in rows]


@router.get("/{department_id}")
async def get_department(
    account_id: AccountID,
    conn: ConnectionTransaction,
    department_id: int,
) -> Department:
    """Get a department by ID."""
    row = await conn.fetchrow(
        "SELECT * FROM department WHERE department_id = $1",
        department_id,
    )
    if row is None:
        raise HTTPException(404, "department not found")

    return Department.model_validate(dict(row))
