import torch
import os
from database.db import clients_collection

# ==============================
# 📁 Paths (SAFE)
# ==============================
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../../"))

CLIENT_WEIGHTS_DIR = os.path.join(BASE_DIR, "experiments/client_weights")
GLOBAL_MODEL_DIR = os.path.join(BASE_DIR, "experiments/global_model")
GLOBAL_MODEL_PATH = os.path.join(GLOBAL_MODEL_DIR, "global_model.pt")


def federated_average():

    # ==============================
    # 🧠 Get clients from DB
    # ==============================
    clients = list(clients_collection.find({}, {"_id": 0}))

    if len(clients) == 0:
        raise Exception("No clients found in database")

    state_dicts = []
    sample_counts = []

    # ==============================
    # 🔥 Load only latest weights per client
    # ==============================
    for client in clients:

        weight_path = client.get("latest_weights")

        if not weight_path or not os.path.exists(weight_path):
            print(f"⚠ Skipping {client['client_id']} (no weights)")
            continue

        state_dict = torch.load(weight_path, map_location="cpu")

        state_dicts.append(state_dict)
        sample_counts.append(client.get("num_samples", 1))

    if len(state_dicts) == 0:
        raise Exception("No valid client weights found")

    # ==============================
    # 🧮 Weighted FedAvg
    # ==============================
    total_samples = sum(sample_counts)

    avg_state_dict = {}

    for key in state_dicts[0].keys():

        avg_state_dict[key] = sum(
            state_dicts[i][key] * (sample_counts[i] / total_samples)
            for i in range(len(state_dicts))
        )

    # ==============================
    # 💾 Save Global Model
    # ==============================
    os.makedirs(GLOBAL_MODEL_DIR, exist_ok=True)

    torch.save(avg_state_dict, GLOBAL_MODEL_PATH)

    return {
        "message": "Aggregation successful",
        "num_clients_used": len(state_dicts),
        "global_model_path": GLOBAL_MODEL_PATH
    }