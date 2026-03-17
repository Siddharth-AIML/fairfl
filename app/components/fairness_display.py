import streamlit as st
import pandas as pd
import os
import json

from api.server_api import get_fairness_metrics


REPORT_DIR = "experiments/fairness_reports"


def show_fairness_results():

    st.header("Federated Fairness Monitoring")

    # -----------------------------
    # CLIENT FAIRNESS REPORTS
    # -----------------------------

    reports = []

    if os.path.exists(REPORT_DIR):

        for file in os.listdir(REPORT_DIR):

            with open(os.path.join(REPORT_DIR, file)) as f:
                reports.append(json.load(f))

    if len(reports) == 0:
        st.info("No client fairness reports available yet.")
    else:

        df = pd.DataFrame(reports)

        st.subheader("Client Fairness Metrics")

        st.dataframe(df)

        # -----------------------------
        # BIAS TREND VISUALIZATION
        # -----------------------------

        st.subheader("Bias Trend (Demographic Parity)")

        try:
            pivot = df.pivot(index="round", columns="client_id", values="demographic_parity")

            if len(pivot.index) == 1:
             st.bar_chart(pivot.T)
            else:
              st.line_chart(pivot)
            
        except:
            st.warning("Not enough data yet to plot fairness trend.")

    # -----------------------------
    # GLOBAL FAIRNESS METRICS
    # -----------------------------

    metrics = get_fairness_metrics()

    if metrics is None:
        st.info("Global fairness metrics not available yet.")
        return

    st.subheader("Global Fairness Summary")

    if "global_demographic_parity" in metrics:
        st.metric("Global Demographic Parity", metrics["global_demographic_parity"])

    if "worst_client" in metrics:
        st.write(f"⚠ Most Biased Client: **{metrics['worst_client']}**")