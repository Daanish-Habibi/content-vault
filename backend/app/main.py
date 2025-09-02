from fastapi import FastAPI

app = FastAPI(title="Content Vault")

@app.get("/health")
def health():
    return {"ok": True}
