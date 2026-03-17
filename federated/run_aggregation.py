import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import torch
import os

from federated.model import AdultIncomeModel
from federated.server import FederatedServer


def main():

    weights_dir = "experiments/client_weights"

    files = os.listdir(weights_dir)

    if len(files) < 5:
        print("Waiting for all clients to finish training")
        return

    client_weights = []

    for file in files:
        w = torch.load(os.path.join(weights_dir, file))
        client_weights.append(w)

    model = AdultIncomeModel(input_size=14)

    server = FederatedServer(model)

    global_model = server.aggregate(client_weights)

    os.makedirs("experiments/global_model", exist_ok=True)

    torch.save(global_model.state_dict(),
               "experiments/global_model/global_model.pt")

    print("Aggregation completed")


if __name__ == "__main__":
    main()