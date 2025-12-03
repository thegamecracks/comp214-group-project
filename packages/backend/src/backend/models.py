from __future__ import annotations

import datetime
from uuid import UUID

from pydantic import BaseModel


class AccountModel(BaseModel):
    account_id: UUID
    name: str


class Country(BaseModel):
    country_id: str
    region_id: int | None
    name: str


class Department(BaseModel):
    department_id: int
    manager_id: int | None
    location_id: int
    name: str


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


class Location(BaseModel):
    location_id: int
    country_id: str | None
    city: str
    street_address: str | None
    postal_code: str | None
    state_province: str | None


class Region(BaseModel):
    region_id: int
    name: str
