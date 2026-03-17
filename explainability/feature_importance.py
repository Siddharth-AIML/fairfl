import shap
import matplotlib.pyplot as plt


def plot_feature_importance(shap_values, X):

    shap.summary_plot(shap_values, X)

    plt.show()