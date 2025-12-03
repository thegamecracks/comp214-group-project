from fastapi import FastAPI

from . import auth, countries, departments, employees, jobs, locations, regions


def include_routers(app: FastAPI) -> None:
    app.include_router(auth.router)
    app.include_router(departments.router)
    app.include_router(employees.router)
    app.include_router(jobs.router)
    app.include_router(countries.router)
    app.include_router(locations.router)
    app.include_router(regions.router)
