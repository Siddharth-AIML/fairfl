import json
import os

FAIRNESS_FILE = "experiments/fairness_metrics.json"


def save_fairness_metrics(data):

    os.makedirs("experiments", exist_ok=True)

    with open(FAIRNESS_FILE, "w") as f:
        json.dump(data, f, indent=4)


def get_fairness_metrics():

    if not os.path.exists(FAIRNESS_FILE):
        return None

    with open(FAIRNESS_FILE, "r") as f:
        return json.load(f)