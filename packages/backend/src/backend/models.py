from __future__ import annotations

import datetime
from uuid import UUID

from pydantic import BaseModel


class AccountModel(BaseModel):
    account_id: UUID
    name: str


class Department(BaseModel):
    department_id: int
    manager_id: int | None
    location_id: int


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


class Job(BaseModel):
    job_id: str
    job_title: str
    job_description: str
    min_salary: float | None
    max_salary: float | None
