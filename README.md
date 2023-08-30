# Requirements

- Node: v18
- Docker
- Docker compose

# Run Database (local)
```
cd docker
docker compose -f docker-compose-local.yml up -d
```

# Run application (watch mode)
```
cp env.sample .env
npm install
npm run start:dev
```

# Visualizer
```
cd visualizer
# Set token in app.py
pip install -r requirements.txt
streamlit run app.py
```


![Alt text](/screenshots/1.png?raw=true "Streamlit Points")
