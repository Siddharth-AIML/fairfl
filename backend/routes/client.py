from fastapi import APIRouter, UploadFile, File, Form
from database.db import clients_collection
import shutil
import os
from datetime import datetime

router = APIRouter()

# ==============================
# 📁 Storage Setup
# ==============================
UPLOAD_DIR = "experiments/client_weights"
os.makedirs(UPLOAD_DIR, exist_ok=True)


# ==============================
# 🚀 SUBMIT CLIENT UPDATE
# ==============================
@router.post("/submit")
async def submit_client_update(
    client_id: str = Form(...),
    organization: str = Form(...),
    num_samples: int = Form(...),
    demographic_parity: float = Form(...),
    group0_accuracy: float = Form(...),
    group1_accuracy: float = Form(...),
    pos_rate_g0: float = Form(...),
    pos_rate_g1: float = Form(...),
    file: UploadFile = File(...)
):

    # 🔥 Unique filename (prevents overwrite history)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_name = f"{client_id}_{timestamp}.pt"
    file_path = os.path.join(UPLOAD_DIR, file_name)

    # Save model file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # ==============================
    # 📊 Client Data
    # ==============================
    data = {
        "client_id": client_id,
        "organization": organization,
        "num_samples": num_samples,
        "dp": demographic_parity,
        "group_accuracy": {
            "g0": group0_accuracy,
            "g1": group1_accuracy
        },
        "pos_rate": {
            "g0": pos_rate_g0,
            "g1": pos_rate_g1
        },
        "latest_weights": file_path,
        "updated_at": datetime.utcnow()
    }

    # ==============================
    # 🔥 UPSERT (No overwrite of other clients)
    # ==============================
    clients_collection.update_one(
        {"client_id": client_id},
        {
            "$set": data,
            "$push": {
                "history": {
                    "file": file_path,
                    "timestamp": datetime.utcnow()
                }
            }
        },
        upsert=True
    )

    return {
        "message": "Client update stored successfully",
        "client_id": client_id,
        "file_saved": file_name
    }


# ==============================
# 🧑‍💻 GET SINGLE CLIENT DATA
# ==============================
@router.get("/my-data/{client_id}")
def get_my_data(client_id: str):

    client = clients_collection.find_one(
        {"client_id": client_id},
        {"_id": 0}
    )

    if not client:
        return {"message": "No data found"}

    return client


# ==============================
# 🖥️ GET ALL CLIENTS (SERVER VIEW)
# ==============================
@router.get("/all")
def get_all_clients():

    clients = list(
        clients_collection.find({}, {"_id": 0})
    )

    return clients

