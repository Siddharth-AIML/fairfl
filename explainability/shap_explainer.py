import shap
import torch


def create_shap_explainer(model, background_data):

    background_data = background_data.numpy()

    explainer = shap.Explainer(
        lambda x: model(torch.tensor(x, dtype=torch.float32)).detach().numpy(),
        background_data
    )

    return explainer