from fastapi import FastAPI, HTTPException, Query
import pandas as pd
from typing import Optional
from io import StringIO
app = FastAPI()

# Fake data for electricity prices for the whole year
data = StringIO("""
Dato,Time,Profil A,Profil B,NorgesPris,Sromstotte,SpotPris
2023,01,0.22,0.966,1.959,1.994,2.169
2024,01,0.22,0.966,1.959,1.994,2.169
""")

# Load the data into a DataFrame
df = pd.read_csv(data, delimiter=',')

def calculate_profitability(df, profile, year):
    if profile not in ['A', 'B']:
        raise HTTPException(status_code=400, detail="Invalid profile")

    profile_col = f'Profil {profile}'
    filtered_data = df[df['Dato'] == year]

    if filtered_data.empty:
        raise HTTPException(status_code=404, detail="No data found for the specified year")

    norgespris_sum = (filtered_data[profile_col] * filtered_data['NorgesPris']).sum()
    sromstotte_sum = (filtered_data[profile_col] * filtered_data['Sromstotte']).sum()
    spotpris_sum = (filtered_data[profile_col] * filtered_data['SpotPris']).sum()

    costs = {
        "NorgesPris": norgespris_sum,
        "Sromstotte": sromstotte_sum,
        "SpotPris": spotpris_sum
    }

    most_cost_effective = min(costs, key=costs.get)

    return {
        "costs": costs,
        "MostCostEffective": most_cost_effective
    }

@app.get("/profitability/")
def profitability(
        profile: str = Query(..., description="Profile A or B"),
        year: int = Query(..., description="Year (e.g., 2023)")
):
    return calculate_profitability(df, profile, year)
