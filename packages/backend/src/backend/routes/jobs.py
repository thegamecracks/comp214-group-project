from asyncpg import PostgresError
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, ConfigDict

from backend.dependencies import AccountID, ConnectionTransaction
from backend.models import Job

router = APIRouter(prefix="/jobs")


class CreateJob(BaseModel):
    job_id: str
    job_title: str
    min_salary: float | None = None
    max_salary: float | None = None

    model_config = ConfigDict(extra="forbid")


class EditJob(BaseModel):
    job_title: str | None = None
    job_description: str | None = None
    min_salary: float | None = None
    max_salary: float | None = None

    model_config = ConfigDict(extra="forbid")


@router.get("")
async def get_jobs(
    account_id: AccountID,
    conn: ConnectionTransaction,
) -> list[Job]:
    """Get a list of all jobs."""
    rows = await conn.fetch("SELECT * FROM job ORDER BY job_id")
    return [Job.model_validate(dict(row)) for row in rows]


@router.get("/{job_id}")
async def get_job(
    account_id: AccountID,
    conn: ConnectionTransaction,
    job_id: str,
) -> Job:
    """Get a job by ID."""
    row = await conn.fetchrow(
        "SELECT * FROM job WHERE job_id = $1",
        job_id,
    )
    if row is None:
        raise HTTPException(404, "job not found")

    return Job.model_validate(dict(row))


@router.post("")
async def create_job(
    account_id: AccountID,
    conn: ConnectionTransaction,
    job: CreateJob,
) -> Job:
    """Create a new job."""
    try:
        await conn.execute(
            "CALL new_job($1, $2, $3, $4)",
            job.job_id,
            job.job_title,
            job.min_salary,
            job.max_salary,
        )
    except PostgresError as e:
        raise HTTPException(400, e.message)

    row = await conn.fetchrow("SELECT * FROM job WHERE job_id = $1", job.job_id)
    assert row is not None
    return Job.model_validate(dict(row))


@router.patch("/{job_id}")
async def edit_job(
    account_id: AccountID,
    conn: ConnectionTransaction,
    job_id: str,
    data: EditJob,
) -> Job:
    """Update an existing job's details."""
    try:
        row = await conn.fetchrow(
            "UPDATE job SET "
            "   job_title = COALESCE($1, job_title), "
            "   job_description = COALESCE($2, job_description), "
            "   min_salary = COALESCE($3, min_salary), "
            "   max_salary = COALESCE($4, max_salary) "
            "WHERE job_id = $5 "
            "RETURNING *",
            data.job_title,
            data.job_description,
            data.min_salary,
            data.max_salary,
            job_id,
        )
    except PostgresError as e:
        raise HTTPException(400, e.message)

    if row is None:
        raise HTTPException(404, "job not found")
    return Job.model_validate(dict(row))
