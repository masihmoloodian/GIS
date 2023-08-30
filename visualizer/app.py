import random
import streamlit as st
import folium
import streamlit as st
from streamlit_folium import st_folium
import requests

st.set_page_config(
    page_title="streamlit-folium documentation",
    page_icon=":world_map:️",
    layout="wide",
)
st.session_state.keep_graphics = True

url = 'http://localhost:3000/point'
headers = {
    'accept': '*/*',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ2ZjAyNzM5LTU2NGUtNGVmZS1iMmIzLTVkNzQwNzUwMmI4YSIsInVzZXJuYW1lIjoibWFzaWhtb2xvb2RpYW5AZ21haWwuY29tIiwiaWF0IjoxNjkzMzY3ODU4LCJleHAiOjE2OTM0NTQyNTh9.HbMuf1eTKoWbIQdIbp9LNbmgY0gSRL_vOYrxKudvVeA'
}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    response = response.json()

points = []
for point in response:
    points.append({
        "lat": point['point']['coordinates'][0],
        "lon": point['point']['coordinates'][1],
        "name": point['name'],
    })

m = folium.Map(zoom_start=2)

for point in points:
    folium.Marker([point["lat"], point["lon"]], popup=point["name"]).add_to(m)
st_data = st_folium(m,width=725)