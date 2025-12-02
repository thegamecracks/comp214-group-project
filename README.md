# comp214-group-project

## Technologies

- Containerization: [Docker](https://docs.docker.com/) or [Podman](https://podman.io/)
- Database: [PostgreSQL 18](https://www.postgresql.org/docs/18/index.html)
- Backend: [Python](https://www.python.org/) with [FastAPI](https://fastapi.tiangolo.com/)

## Containerization Setup

1. Install [Docker Desktop](https://docs.docker.com/get-started/get-docker/)
   or [Podman](https://podman.io/docs/installation)
2. Copy the `env.example` file to `.env`, and adjust environment variables accordingly
3. Copy the `postgresql.conf.example` file to `postgresql.conf`
4. Run the project:

   ```sh
   docker compose up --build
   # To tear down:
   docker compose down
   # To tear down and delete existing data:
   docker compose down --volumes
   # Or with podman:
   podman compose up
   podman compose down
   podman compose down --volumes
   ```

## Frontend Setup (Manual)

1. Install Bun: https://bun.com/docs/installation

   ```sh
   # Windows
   powershell -c "irm bun.sh/install.ps1|iex"
   ```

2. Create the frontend environment with Bun:

   ```sh
   bun install
   ```

3. Run the frontend:

   ```sh
   bun dev
   ```

4. Build static files for production:

   ```sh
   bun run build
   ```

## Backend Setup (Manual)

1. Install uv: https://docs.astral.sh/uv/getting-started/installation/

   ```sh
   # Windows
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

2. Install Python 3.11 using uv, pymanager, or any equivalent option:

   ```sh
   uv python install 3.11
   # or on Windows, install pymanager:
   winget install 9NQ7512CXL7T
   py install 3.11
   ```

3. Create the backend environment with uv:

   ```sh
   uv sync --frozen
   ```

4. Run the backend:

   ```sh
   uv run --directory packages/backend/src/ --env-file ../../../.env -m uvicorn backend:app --reload
   ```
