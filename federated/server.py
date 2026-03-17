import torch

from federated.aggregation import federated_average


class FederatedServer:

    def __init__(self, global_model):
        self.global_model = global_model

    def aggregate(self, client_weights):

        avg_weights = federated_average(client_weights)

        self.global_model.load_state_dict(avg_weights)

        print("Aggregation completed")

        return self.global_model