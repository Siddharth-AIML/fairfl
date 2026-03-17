import glob
import pandas as pd
import torch

# preprocessing
from preprocessing.data_loader import load_dataset
from preprocessing.preprocess import preprocess_data
from preprocessing.split_clients import split_dataset

# federated learning
from federated.client import FederatedClient
from federated.server import FederatedServer
from federated.model import AdultIncomeModel

# fairness
from fairness.bias_detection import detect_bias

# api
from api.training_status import (
    initialize_clients,
    update_client_status,
    update_round_status
)

from api.server_api import save_fairness_metrics


def main():

    print("Starting FairFL Pipeline")

    # =========================
    # 1️⃣ LOAD DATASET
    # =========================

    dataset_path = "data/raw/adult.csv"

    df = load_dataset(dataset_path)

    # =========================
    # 2️⃣ PREPROCESS DATA
    # =========================

    df = preprocess_data(df)

    # =========================
    # 3️⃣ SPLIT DATA FOR CLIENTS
    # =========================

    split_dataset(df, num_clients=5)

    # =========================
    # 4️⃣ CREATE CLIENT OBJECTS
    # =========================

    client_files = glob.glob("data/processed/client_*.csv")

    clients = [FederatedClient(path) for path in client_files]

    input_size = clients[0].X.shape[1]

    global_model = AdultIncomeModel(input_size)

    server = FederatedServer(global_model)

    num_clients = len(clients)

    # initialize dashboard client status
    initialize_clients(num_clients)

    rounds = 3

    # =========================
    # 5️⃣ FEDERATED TRAINING
    # =========================

    for r in range(rounds):

        print(f"\nFederated Round {r+1}")

        update_round_status(r + 1, rounds)

        client_weights = []

        for i, client in enumerate(clients):

            client_name = f"Client {i+1}"

            # client starts training
            update_client_status(client_name, "Training")

            weights = client.train()

            # client completed training
            update_client_status(client_name, "Completed")

            client_weights.append(weights)

        # server aggregates weights
        print("Server aggregating weights...")

        global_model = server.aggregate(client_weights)

        # update status after aggregation
        for i in range(num_clients):

            update_client_status(f"Client {i+1}", "Aggregated")

    print("\nFederated Training Completed")

    # =========================
    # 6️⃣ FAIRNESS ANALYSIS
    # =========================

    print("\nRunning Bias Detection")

    test_data = pd.read_csv("data/processed/client_1.csv")

    sensitive = test_data["sex"].values

    X = test_data.drop("income", axis=1).values
    y = test_data["income"].values

    X_tensor = torch.tensor(X, dtype=torch.float32)
    y_tensor = torch.tensor(y, dtype=torch.float32).view(-1, 1)

    dp, acc_by_group = detect_bias(global_model, X_tensor, y_tensor, sensitive)

    # =========================
    # 7️⃣ SAVE FAIRNESS RESULTS
    # =========================

    save_fairness_metrics({
        "demographic_parity": float(dp),
        "group_accuracy": {str(k): float(v) for k, v in acc_by_group.items()}
    })

    print("\nFairness metrics saved successfully")

    print("\nFairFL Pipeline Completed")


if __name__ == "__main__":
    main()