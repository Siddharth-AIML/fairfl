import numpy as np


def demographic_parity(y_pred, sensitive_attr):
     
    group0 = y_pred[sensitive_attr == 0]
    group1 = y_pred[sensitive_attr == 1]

    rate0 = np.mean(group0)
    rate1 = np.mean(group1)

    dp_diff = abs(rate0 - rate1)

    return dp_diff


def group_accuracy(y_true, y_pred, sensitive_attr):
    """
    Accuracy by sensitive groups
    """

    results = {}

    for group in np.unique(sensitive_attr):

        idx = sensitive_attr == group

        acc = np.mean(y_true[idx] == y_pred[idx])

        results[group] = acc

    return results