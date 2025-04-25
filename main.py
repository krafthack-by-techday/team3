from fastapi import FastAPI, Query, HTTPException
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
 
origins = [ "http://localhost:3000",
]
 
app.add_middleware(
CORSMiddleware,
allow_origins=origins,
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)
 
# Mock CSV data
data = """
Modell,Timestamp,Profil A,Profil B
strømstøtte,2023-01-01,4251.38,6955.29
strømstøtte,2024-01-01,4557.83,6905.09
norgespris,2023-01-01,2603.85,4001.15
norgespris,2024-01-01,3341.89,4988.67
"""
 
# Load the data into a DataFrame
from io import StringIO
df = pd.read_csv(StringIO(data))
df['Year'] = pd.to_datetime(df['Timestamp']).dt.year
 
# Mapping shorthand to full column name
profil_map = {
    "A": "Profil A",
    "B": "Profil B"
}
 
@app.get("/best_model")
def best_model(year: int = Query(...), profil: str = Query(..., description="Use 'A' or 'B'")):
    if profil not in profil_map:
        raise HTTPException(status_code=400, detail="Invalid profil. Use 'A' or 'B'.")
 
    column_name = profil_map[profil]
 
    year_data = df[df['Year'] == year]
 
    if year_data.empty:
        raise HTTPException(status_code=404, detail="No data for the given year.")
 
    # Get the cost for each model
    costs = year_data[['Modell', column_name]].set_index('Modell')[column_name]
 
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
