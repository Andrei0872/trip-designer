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

---
## Diagrams
  <p align="center">
  <b>ERD</b>
  </p>
  <div style="text-align: center;">
    <img src="./screenshots/ERD.png">
  </div>
  
  <p align="center">
  <b>Conceptual Diagram</b>
  </p>
  <div style="text-align: center;">
    <img src="./screenshots/Conceptual-Diagram.png">
  </div>

---

## Visualizing the database with `pgadmin`

* type in `localhost` in the URL bar
* type in the **email** and **password**; they must correspond with the values from the `docker-compose.yml` file
* add a new connection
* for the **hostname**, use the **name of the container**; that can found with `docker ps`

  <div style="text-align: center;">
    <img src="./screenshots/pgadmin.png">
  </div>

* for the **username** and the **password**, use the values from the `.env` file

This is `pgadmin` in action:

<div style="text-align: center;">
  <img src="./screenshots/pgadmin-in-action.png">
</div>
