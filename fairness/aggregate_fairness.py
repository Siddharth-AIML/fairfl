import os
import json
import pandas as pd

REPORT_DIR = "experiments/fairness_reports"


def aggregate_fairness():

    reports = []

    for file in os.listdir(REPORT_DIR):
        with open(os.path.join(REPORT_DIR, file)) as f:
            reports.append(json.load(f))

    df = pd.DataFrame(reports)

    global_dp = df["demographic_parity"].mean()

    worst_client = df.loc[df["demographic_parity"].idxmax()]["client_id"]

    summary = {
        "global_demographic_parity": float(global_dp),
        "worst_client": worst_client
    }

    with open("experiments/fairness_metrics.json", "w") as f:
        json.dump(summary, f, indent=4)

    print("Global fairness metrics generated.")


if __name__ == "__main__":
    aggregate_fairness()