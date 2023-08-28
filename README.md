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
npm run start:dev
```