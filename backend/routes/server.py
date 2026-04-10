from fastapi import APIRouter
from database.db import clients_collection
from services.aggregation import aggregate_models
from fastapi import APIRouter
from fastapi.responses import FileResponse
import os
from fastapi import APIRouter
from federated.aggregation import federated_average

router = APIRouter()


@router.get("/clients")
def get_clients():
    return list(clients_collection.find({}, {"_id": 0}))


@router.post("/aggregate")
def aggregate_model():

    try:
        path = federated_average()

        return {
            "message": "Aggregation completed",
            "model_path": path
        }

    except Exception as e:
        return {"error": str(e)}

@router.get("/explainability")
def get_explainability():
    import json

    try:
        with open("experiments/explainability/feature_importance.json") as f:
            data = json.load(f)

        return data
    except:
        return {"error": "Explainability not generated"}
    

@router.get("/clients")
def get_clients():
    return list(clients_collection.find({}, {"_id": 0}))

GLOBAL_MODEL_PATH = "experiments/global_model/global_model.pt"

@router.get("/download-model")
def download_model():

    if not os.path.exists(GLOBAL_MODEL_PATH):
        return {"error": "Global model not available"}

    return FileResponse(
        path=GLOBAL_MODEL_PATH,
        filename="global_model.pt",
        media_type="application/octet-stream"
    )