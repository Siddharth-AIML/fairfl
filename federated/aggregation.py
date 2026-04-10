import torch
import os
from federated.model import AdultIncomeModel

CLIENT_WEIGHTS_DIR = "experiments/client_weights"
GLOBAL_MODEL_PATH = "experiments/global_model/global_model.pt"


def federated_average():

    files = [f for f in os.listdir(CLIENT_WEIGHTS_DIR) if f.endswith(".pt")]

    if len(files) == 0:
        raise Exception("No client weights found")

    state_dicts = []

    # Load all client models
    for file in files:
        path = os.path.join(CLIENT_WEIGHTS_DIR, file)
        state_dicts.append(torch.load(path, map_location="cpu"))

    # Initialize global model
    sample_model = state_dicts[0]
    avg_state_dict = {}

    # FedAvg
    for key in sample_model.keys():
        avg_state_dict[key] = sum(
            [sd[key] for sd in state_dicts]
        ) / len(state_dicts)

    # Save global model
    os.makedirs("experiments/global_model", exist_ok=True)
    torch.save(avg_state_dict, GLOBAL_MODEL_PATH)

    return GLOBAL_MODEL_PATH