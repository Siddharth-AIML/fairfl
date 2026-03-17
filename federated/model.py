import torch
import torch.nn as nn


class AdultIncomeModel(nn.Module):

    def __init__(self, input_size):
        super(AdultIncomeModel, self).__init__()

        self.network = nn.Sequential(
            nn.Linear(input_size, 32),
            nn.ReLU(),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, 1),
            nn.Sigmoid()
        )

    def forward(self, x):
        return self.network(x)