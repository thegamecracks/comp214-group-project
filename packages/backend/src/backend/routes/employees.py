from asyncpg import RaiseError
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, ConfigDict

from backend.dependencies import AccountID, ConnectionTransaction
from backend.models import Employee

router = APIRouter(prefix="/employees")


class HireEmployee(BaseModel):
    first_name: str | None = None
    last_name: str
    email: str
    phone_number: str | None = None
    job_id: str
    salary: float | None = None
    commission_pct: float | None = None
    manager_id: int | None = None
    department_id: int | None = None

    model_config = ConfigDict(extra="forbid")


class EditEmployee(BaseModel):
    email: str | None = None
    phone_number: str | None = None
    salary: float | None = None

    model_config = ConfigDict(extra="forbid")


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


@router.post("")
async def hire_employee(
    account_id: AccountID,
    conn: ConnectionTransaction,
    employee: HireEmployee,
) -> Employee:
    """Hire a new employee."""
    try:
        await conn.execute(
            "CALL hire_employee($1, $2, $3, $4, CURRENT_DATE, $5, $6, $7, $8)",
            employee.first_name,
            employee.last_name,
            employee.email,
            employee.phone_number,
            employee.job_id,
            employee.salary,
            employee.manager_id,
            employee.department_id,
        )
    except RaiseError as e:
        raise HTTPException(400, e.message)

    row = await conn.fetchrow("SELECT * FROM employee WHERE email = $1", employee.email)
    assert row is not None
    return Employee.model_validate(dict(row))


@router.patch("/{employee_id}")
async def edit_employee(
    account_id: AccountID,
    conn: ConnectionTransaction,
    employee_id: int,
    data: EditEmployee,
) -> Employee:
    """Update an existing employee's details."""
    try:
        row = await conn.fetchrow(
            "UPDATE employee SET "
            "   email = COALESCE($1, email), "
            "   phone_number = COALESCE($2, phone_number), "
            "   salary = COALESCE($3, salary) "
            "WHERE employee_id = $4 "
            "RETURNING *",
            data.email,
            data.phone_number,
            data.salary,
            employee_id,
        )
    except RaiseError as e:
        raise HTTPException(400, e.message)

    if row is None:
        raise HTTPException(404, "employee not found")
    return Employee.model_validate(dict(row))
