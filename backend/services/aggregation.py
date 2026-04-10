import torch
from database.db import clients_collection

def aggregate_models():

    clients = list(clients_collection.find())

    if len(clients) == 0:
        return None

    weights_list = []
    total_samples = 0

    for c in clients:
        weights = torch.load(c["file_path"])
        weights_list.append((weights, c["num_samples"]))
        total_samples += c["num_samples"]

    global_weights = {}

    for key in weights_list[0][0].keys():
        global_weights[key] = sum(
            w[key] * (n / total_samples)
            for w, n in weights_list
        )

    torch.save(global_weights, "experiments/global_model.pt")

    return "Global model updated"