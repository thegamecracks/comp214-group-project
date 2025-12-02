from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.dependencies import AccountID, ConnectionTransaction

router = APIRouter(prefix="/jobs")


class Job(BaseModel):
    job_id: str
    job_title: str
    min_salary: float
    max_salary: float


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
