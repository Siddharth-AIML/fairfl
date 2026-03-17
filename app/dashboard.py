import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
import streamlit as st
from streamlit_autorefresh import st_autorefresh
st_autorefresh(interval=2000, key="datarefresh")
import pandas as pd

from components.client_status import show_client_status
from components.training_monitor import show_training_monitor
from components.fairness_display import show_fairness_results
from components.explainability_view import show_explainability
st.set_page_config(page_title="FairFL Dashboard", layout="wide")

st.title("FairFL: Federated Learning Ethical AI Dashboard")

st.sidebar.header("Navigation")

page = st.sidebar.radio(
    "Select Module",
    ["Client Status", "Training Monitor", "Fairness Analysis", "Explainability"]
)

if page == "Client Status":
    show_client_status()

elif page == "Training Monitor":
    show_training_monitor()

elif page == "Fairness Analysis":
    show_fairness_results()

elif page == "Explainability":
    show_explainability()