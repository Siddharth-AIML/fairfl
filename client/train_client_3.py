import sys
import os

# add project root to python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import torch
import json
import pandas as pd

from federated.client import FederatedClient
from api.training_status import update_client_status, increment_round
from fairness.bias_detection import detect_bias


CLIENT_NAME = "Client 3"
DATA_PATH = "data/processed/client_3.csv"


def main():

    # mark client training started
    update_client_status(CLIENT_NAME, "Training")

    # train model
    client = FederatedClient(DATA_PATH)

    weights = client.train()

    # save model weights
    os.makedirs("experiments/client_weights", exist_ok=True)

    torch.save(weights, "experiments/client_weights/client_3.pt")

    # update status
    update_client_status(CLIENT_NAME, "Completed")

    print("Client 3 training finished")

    # -----------------------------
    # LOCAL FAIRNESS ANALYSIS
    # -----------------------------

    data = pd.read_csv(DATA_PATH)

    sensitive = data["sex"].values

    X = data.drop("income", axis=1).values
    y = data["income"].values

    dp, acc = detect_bias(client.model, X, y, sensitive)

    fairness_report = {
        "client_id": CLIENT_NAME,
        "round": 1,
        "samples": len(data),
        "demographic_parity": float(dp)
    }

    os.makedirs("experiments/fairness_reports", exist_ok=True)

    with open(
        f"experiments/fairness_reports/{CLIENT_NAME.replace(' ','_').lower()}_round1.json",
        "w"
    ) as f:
        json.dump(fairness_report, f, indent=4)

    print("Fairness report generated")

    # increment training progress
    increment_round()


if __name__ == "__main__":
    main()