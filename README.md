# FairFL: Federated Learning with Bias Detection, Mitigation & Ethical Evaluation

## Features
- Federated Learning Simulation
- Multi-client training
- Bias detection using Demographic Parity
- Fairness monitoring dashboard
- Explainable AI (planned)

## How to Run

### 1. Preprocess Data
python preprocessing/run_preprocessing.py

### 2. Train Clients
python client/train_client_1.py
python client/train_client_2.py
...

### 3. Run Dashboard
streamlit run app/dashboard.py

## Future Work
- Use Flower framework for real distributed FL
- Multi-machine client-server architecture
- Advanced fairness mitigation
