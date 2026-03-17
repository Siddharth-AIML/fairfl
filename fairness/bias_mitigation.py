import pandas as pd


def balance_dataset(df, sensitive_column="sex"):

    groups = df[sensitive_column].value_counts()

    min_size = groups.min()

    balanced_df = pd.concat([
        df[df[sensitive_column] == g].sample(min_size)
        for g in groups.index
    ])

    print("Dataset balanced for fairness mitigation")

    return balanced_df