import torch


def federated_average(weights):

    avg_weights = {}

    for key in weights[0].keys():
        avg_weights[key] = torch.stack([w[key] for w in weights], 0).mean(0)

    return avg_weights