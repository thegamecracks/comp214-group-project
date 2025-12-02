import datetime

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.dependencies import AccountID, ConnectionTransaction

router = APIRouter(prefix="/employees")


class Employee(BaseModel):
    employee_id: int
    first_name: str | None
    last_name: str
    email: str
    phone_number: str | None
    hire_date: datetime.date
    job_id: str
    salary: float | None
    commission_pct: float | None
    manager_id: int | None
    department_id: int | None


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
