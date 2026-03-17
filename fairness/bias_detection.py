import numpy as np
import torch

from fairness.fairness_metrics import demographic_parity, group_accuracy


def detect_bias(model, X, y, sensitive_attr):

    # -----------------------------
    # Ensure inputs are torch tensors
    # -----------------------------

    if isinstance(X, np.ndarray):
        X = torch.tensor(X, dtype=torch.float32)

    if isinstance(y, np.ndarray):
        y = torch.tensor(y, dtype=torch.float32).view(-1, 1)

    # -----------------------------
    # Model prediction
    # -----------------------------

    model.eval()

    with torch.no_grad():
        predictions = model(X).detach().cpu().numpy()

    predictions = (predictions > 0.5).astype(int).flatten()

    y_true = y.detach().cpu().numpy().flatten()

    # -----------------------------
    # Fairness Metrics
    # -----------------------------

    dp = demographic_parity(predictions, sensitive_attr)

    acc_by_group = group_accuracy(y_true, predictions, sensitive_attr)

    print("\nBias Detection Results")
    print("----------------------")
    print("Demographic Parity Difference:", dp)
    print("Accuracy by group:", acc_by_group)

    return dp, acc_by_group