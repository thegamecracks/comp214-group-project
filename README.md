# comp214-group-project

## Technologies

- Containerization: [Docker](https://docs.docker.com/)
- Database: [PostgreSQL 18](https://www.postgresql.org/docs/18/index.html)
- Backend: [Python](https://www.python.org/)

## Docker Setup

1. Install Docker Engine or Docker Desktop: https://docs.docker.com/get-started/get-docker/
2. Copy the `env.example` file to `.env`, and adjust environment variables accordingly
3. Run the project:

   ```sh
   docker compose up
   # To tear down:
   docker compose down
   # To tear down and delete existing data:
   docker compose down --volumes
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

3. Create the backend environment with uv (make sure terminal's current working directory is in this project):

   ```sh
   uv sync
   ```

4. Run the backend:

   ```sh
   uv run -m backend
   ```
