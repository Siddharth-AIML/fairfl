import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))
import streamlit as st
from api.training_status import get_training_status


def show_client_status():

    st.header("Federated Client Status")

    status = get_training_status()

    if status is None:
        st.write("No training started yet.")
        return

    for client, state in status["clients"].items():
        st.write(f"{client}: {state}")