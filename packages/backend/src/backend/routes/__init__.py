from fastapi import FastAPI

from . import auth, departments, employees, jobs


def include_routers(app: FastAPI) -> None:
    app.include_router(auth.router)
    app.include_router(departments.router)
    app.include_router(employees.router)
    app.include_router(jobs.router)
