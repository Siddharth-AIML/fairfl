from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import client, server,auth
from fastapi.staticfiles import StaticFiles

app = FastAPI()
# ✅ ADD THIS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for dev (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(client.router, prefix="/client")
app.include_router(server.router, prefix="/server")
app.include_router(auth.router, prefix="/auth")

@app.get("/")
def home():
    return {"message": "FairFL Backend Running"}