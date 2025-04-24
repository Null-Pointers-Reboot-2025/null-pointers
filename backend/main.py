# main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5005", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PingPayload(BaseModel):
    data: str

@app.post("/api/ping")
async def ping(payload: PingPayload):
    print(f"Received: {payload.data}")
    return {"message": "pong"}