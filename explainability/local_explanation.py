import shap
import matplotlib.pyplot as plt


def explain_single_prediction(explainer, X, index=0):

    shap_values = explainer(X)

    shap.plots.waterfall(shap_values[index])

    plt.show()