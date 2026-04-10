from federated.model import AdultIncomeModel
from explainability.shap_explainer import create_shap_explainer
import pandas as pd
import torch


def run_explainability():

    data = pd.read_csv("data/processed/client_1.csv")

    X = data.drop("income", axis=1).values

    input_size = X.shape[1]

    model = AdultIncomeModel(input_size)
    model.load_state_dict(torch.load("experiments/global_model/global_model.pt", map_location=torch.device("cpu")))
    model.eval()

    X_tensor = torch.tensor(X, dtype=torch.float32)

    sample_size = 20

    X_sample = X[:sample_size]
    X_tensor_sample = X_tensor[:sample_size]

    background = X_tensor[:sample_size]

    explainer = create_shap_explainer(model, background)


    shap_values = explainer.shap_values(X_tensor_sample)

    if isinstance(shap_values, list):
        shap_values = shap_values[0]

    return shap_values, X_sample, explainer