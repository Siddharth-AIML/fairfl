import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import torch
import pandas as pd

from federated.model import AdultIncomeModel
from fairness.bias_detection import detect_bias
from api.server_api import save_fairness_metrics


def main():

    model = AdultIncomeModel(input_size=14)

    model.load_state_dict(
        torch.load("experiments/global_model/global_model.pt")
    )

    data = pd.read_csv("data/processed/client_1.csv")

    sensitive = data["sex"].values

    X = data.drop("income", axis=1).values
    y = data["income"].values

    X_tensor = torch.tensor(X, dtype=torch.float32)
    y_tensor = torch.tensor(y, dtype=torch.float32).view(-1, 1)

    dp, acc = detect_bias(model, X_tensor, y_tensor, sensitive)

    save_fairness_metrics({
        "demographic_parity": float(dp),
        "group_accuracy": {str(k): float(v) for k, v in acc.items()}
    })

    print("Fairness analysis completed")


if __name__ == "__main__":
    main()