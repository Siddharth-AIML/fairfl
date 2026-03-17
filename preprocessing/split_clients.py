import os
import numpy as np


def split_dataset(df, num_clients=5, output_dir="data/processed"):
    """
    Split dataset into multiple client datasets
    """

    os.makedirs(output_dir, exist_ok=True)

    splits = np.array_split(df, num_clients)

    for i, split in enumerate(splits):
        file_path = f"{output_dir}/client_{i+1}.csv"
        split.to_csv(file_path, index=False)

        print(f"Saved: {file_path}")

    print("Dataset split completed.")