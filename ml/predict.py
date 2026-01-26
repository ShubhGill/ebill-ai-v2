import sys, json, joblib, pandas as pd

features = json.loads(sys.argv[1])
model = joblib.load("ml/model.joblib")

df = pd.DataFrame([features])
prob = model.predict_proba(df)[0][1]

print(prob)
