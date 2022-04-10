# Trip Designer

## Prerequisites

* [Docker](https://docs.docker.com/get-docker/)
* [Docker Compose](https://docs.docker.com/compose/install/)

---

## Getting started

### Setting up ENV variables

```bash
cd server

cp .env.example .env
```

### Installing the dependencies

```bash
cd client && npm i

cd ..

cd server && npm i
```

### Starting the containers

```bash
docker-compose -f docker-compose.yml --env-file ./server/.env up
```

### Starting the client app

```bash
cd client && npm run start
```