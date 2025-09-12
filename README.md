# AniVault Database

It’s a simple anime browser: a FastAPI backend proxies the Jikan API, and a Next.js frontend shows anime cards and basic site stats

Small monorepo:
- **Backend**: FastAPI proxy to the public **Jikan** API (no DB). Adds a tiny cache for `/api/stats`.
- **Frontend**: Next.js (App Router) that renders a landing grid (8 anime) + a full anime page.

---

## Get started

### 1) Requirements
- Python 3.11+
- Node 18+

### 2) Env files
Copy the examples and edit as needed:

```bash
cp backend/.env.example backend/.env.local
cp frontend/.env.example frontend/.env.local

## Run the backend

cd backend
python -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Install & run the frontend

```bash
cd frontend

# If you already have package.json (most Next apps do):
npm install
npm run dev
# => http://localhost:3000
```
