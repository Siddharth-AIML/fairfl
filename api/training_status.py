import json
import os

STATUS_FILE = "experiments/training_status.json"


def initialize_clients(num_clients):

    clients = {}

    for i in range(num_clients):
        clients[f"Client {i+1}"] = "Idle"

    data = {
        "current_round": 0,
        "total_rounds": 0,
        "clients": clients
    }

    os.makedirs("experiments", exist_ok=True)

    with open(STATUS_FILE, "w") as f:
        json.dump(data, f, indent=4)


def update_client_status(client_name, status):

    if not os.path.exists(STATUS_FILE):
        return

    with open(STATUS_FILE, "r") as f:
        data = json.load(f)

    data["clients"][client_name] = status

    with open(STATUS_FILE, "w") as f:
        json.dump(data, f, indent=4)


def update_round_status(round_number, total_rounds):

    with open(STATUS_FILE, "r") as f:
        data = json.load(f)

    data["current_round"] = round_number
    data["total_rounds"] = total_rounds

    with open(STATUS_FILE, "w") as f:
        json.dump(data, f, indent=4)

def increment_round():

    if not os.path.exists(STATUS_FILE):
        return

    with open(STATUS_FILE, "r") as f:
        data = json.load(f)

    data["current_round"] += 1

    with open(STATUS_FILE, "w") as f:
        json.dump(data, f, indent=4)   
        
def get_training_status():

    if not os.path.exists(STATUS_FILE):
        return None

    with open(STATUS_FILE, "r") as f:
        return json.load(f)