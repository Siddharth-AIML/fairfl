import streamlit as st
from api.training_status import get_training_status


def show_training_monitor():

    status = get_training_status()

    st.header("Federated Training Progress")

    if status is None:
        st.info("Training has not started yet.")
        return

    current_round = status.get("current_round", 0)
    total_rounds = status.get("total_rounds", 0)

    # avoid division by zero
    if total_rounds == 0:
        st.info("Training not started yet.")
        return

    progress = current_round / total_rounds

    st.progress(progress)

    st.write(f"Training Round {current_round} of {total_rounds}")