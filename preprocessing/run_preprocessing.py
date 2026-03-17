import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from preprocessing.data_loader import load_dataset
from preprocessing.preprocess import preprocess_data
from preprocessing.split_clients import split_dataset

from api.training_status import initialize_clients

def main():

    dataset_path = "data/raw/adult.csv"

    df = load_dataset(dataset_path)

    df = preprocess_data(df)

    split_dataset(df, num_clients=5)

    initialize_clients(5)

    print("Preprocessing completed")


if __name__ == "__main__":
    main()