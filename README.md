# GIS
- Backend: NestJS   
- Client: Streamlit   
- LLM model: OpenAI   
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
# Fill environment variables
npm install
npm run start:dev
```

- By default app running on port 3000   
- Swagger: /docs

## Note:
LLM endpoints need OPENAI KEY
# Visualizer
## Requirements
Python 3.11

## Run application

```
cd visualizer
# Set JWT token in app.py
pip install -r requirements.txt
streamlit run app.py
```


![Alt text](/screenshots/1.png?raw=true "Streamlit Points")
