import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

data = pd.DataFrame([
    [0.1,0.05,0.1,0.7,1],
    [0.4,0.3,0.5,0.2,0],
    [0.05,0.02,0.0,0.9,1],
    [0.3,0.25,0.4,0.3,0]
], columns=[
    "returnRate",
    "cancelRate",
    "codReturnRate",
    "prepaidRate",
    "delivered"
])

X = data.drop("delivered", axis=1)
y = data["delivered"]

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "model.joblib")
print("ML model trained")
