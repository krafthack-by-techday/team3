from fastapi import FastAPI, Query, HTTPException
from typing import List, Dict
import pandas as pd

app = FastAPI()

# Mock CSV data
data = """
Modell,Timestamp,Profil A,Profil B
strømstøtte,2023-01-01,4251.38,6955.29
strømstøtte,2024-01-01,4557.83,6905.09
norgespris,2023-01-01,2603.85,4001.15
norgespris,2024-01-01,3341.89,4988.67
spotpris,2023-01-01,4003.85,4500.15
spotpris,2024-01-01,5000.89,4988.67
"""

# Load the data into a DataFrame
from io import StringIO
df = pd.read_csv(StringIO(data))
df['Year'] = pd.to_datetime(df['Timestamp']).dt.year

@app.get("/best_model")
def best_model(year: int = Query(...), profil: str = Query(...)):
    if profil not in ["Profil A", "Profil B"]:
        raise HTTPException(status_code=400, detail="Invalid profil. Use 'Profil A' or 'Profil B'.")

    year_data = df[df['Year'] == year]

    if year_data.empty:
        raise HTTPException(status_code=404, detail="No data for the given year.")

    # Get the cost for each model
    costs = year_data[['Modell', profil]].set_index('Modell')[profil]

    # Find the best model (lowest cost)
    best_modell = costs.idxmin()
    best_price = costs.min()

    # Calculate percentage savings vs other models
    savings = {
        modell: round(((cost - best_price) / cost) * 100, 2)
        for modell, cost in costs.items() if modell != best_modell
    }

    return {
        "year": year,
        "profil": profil,
        "best_modell": best_modell,
        "best_price": best_price,
        "percent_savings_vs_others": savings
    }
