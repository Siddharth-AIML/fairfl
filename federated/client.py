import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim

from federated.model import AdultIncomeModel


class FederatedClient:

    def __init__(self, data_path):

        self.data = pd.read_csv(data_path)

        X = self.data.drop("income", axis=1).values
        y = self.data["income"].values

        self.X = torch.tensor(X, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.float32).view(-1, 1)

        self.model = AdultIncomeModel(self.X.shape[1])

        self.criterion = nn.BCELoss()
        self.optimizer = optim.Adam(self.model.parameters(), lr=0.001)

    def train(self, epochs=2):

        for epoch in range(epochs):

            outputs = self.model(self.X)
            loss = self.criterion(outputs, self.y)

            self.optimizer.zero_grad()
            loss.backward()
            self.optimizer.step()

        return self.model.state_dict()