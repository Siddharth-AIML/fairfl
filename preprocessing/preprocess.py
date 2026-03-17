import pandas as pd
from sklearn.preprocessing import LabelEncoder


def preprocess_data(df):
    """
    Clean and encode dataset
    """

    # Replace '?' values
    df = df.replace("?", pd.NA)

    # Drop missing values
    df = df.dropna()

    # Strip spaces from column names
    df.columns = df.columns.str.strip()

    # Strip spaces from string values
    for col in df.select_dtypes(include="object").columns:
        df[col] = df[col].str.strip()

    # Encode categorical columns
    label_encoders = {}

    for col in df.select_dtypes(include="object").columns:
        encoder = LabelEncoder()
        df[col] = encoder.fit_transform(df[col])
        label_encoders[col] = encoder

    print("Preprocessing Completed")

    return df