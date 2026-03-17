import pandas as pd

def load_dataset(path):
    
    df = pd.read_csv("data/adult.csv")

    print("Dataset Loaded Successfully")
    print("Shape:", df.shape)

    return df