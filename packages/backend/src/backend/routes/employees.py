from fastapi import APIRouter, HTTPException

from backend.dependencies import AccountID, ConnectionTransaction
from backend.models import Employee

router = APIRouter(prefix="/employees")


@router.get("")
async def get_employees(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> list[Employee]:
    """Get a list of all registered employees."""
    rows = await conn.fetch("SELECT * FROM employee ORDER BY employee_id")
    return [Employee.model_validate(dict(row)) for row in rows]


@router.get("/{employee_id}")
async def get_employee(
    account_id: AccountID,
    conn: ConnectionTransaction,
    employee_id: int,
) -> Employee:
    """Get an employee by ID."""
    row = await conn.fetchrow(
        "SELECT * FROM employee WHERE employee_id = $1",
        employee_id,
    )
    if row is None:
        raise HTTPException(404, "employee not found")

    return Employee.model_validate(dict(row))
