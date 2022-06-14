# Trip Designer

- [Trip Designer](#trip-designer)
  - [About our app](#about-our-app)
  - [Prerequisites](#prerequisites)
  - [Getting started](#getting-started)
    - [Setting up ENV variables](#setting-up-env-variables)
    - [Specifying the key for signing tokens](#specifying-the-key-for-signing-tokens)
    - [Installing the dependencies](#installing-the-dependencies)
    - [Starting the containers](#starting-the-containers)
    - [Starting the client app](#starting-the-client-app)
    - [Troubleshooting when containers no longer work after installing dependencies](#troubleshooting-when-containers-no-longer-work-after-installing-dependencies)
  - [The software development of this project included:](#the-software-development-of-this-project-included)
    - [User stories & backlog creation](#user-stories--backlog-creation)
    - [Design/ architecture/ UML](#design-architecture-uml)
    - [Source control](#source-control)
    - [Unit tests](#unit-tests)
    - [Bug reporting](#bug-reporting)
    - [Build tool](#build-tool)
    - [Refactoring and code standards](#refactoring-and-code-standards)
    - [Design patterns](#design-patterns)
  - [Visualizing the database with `pgadmin`](#visualizing-the-database-with-pgadmin)


## About our app
&emsp; Do you have a passion for travelling but also a passion for being organized? Then we believe we have the perfect app for you!  
&emsp; **TripDesigner** is here to help you organize your trips in a very fun and easy way, so that all details are always at hand. From now on, finding activities and organizing them on days, so that you get the most out of your vacation, will not be stressful at all, and most importantly will not include pen and paper. Using drag&drop you will be able to personalize your dream vacation and also keep track of the objectives that you visit (and restaurants too!). Moreover, you will have the opportunity to view your old trips with just a few clicks.  If we haven’t conviced you yet, we have to say that we also have to-do lists so that you will no longer forget to take sunscreen, or worse, a family member 😊. Come check out our app end enjoy the process of trip planning!


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

### Specifying the key for signing tokens

```bash
cd server/token/
```

```bash
cp .key.example .key
```

Make sure to add a key that's difficult to guess!

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

### Troubleshooting when containers no longer work after installing dependencies

```bash
docker-compose -f docker-compose.yml --env-file ./server/.env down -v
```

```bash
docker-compose -f docker-compose.yml --env-file ./server/.env up --build --force-recreate
```

---

## The software development of this project included:

### User stories & backlog creation

&emsp; In order to organize ideas and tasks we used a [Trello board](https://trello.com/b/psYmJyji/tripdesigner). There, we wrote user stories or tasks in cards and moved those cards in different lists, as we resolved them. Lists such as "Backlog", "Ready", "Ongoing", "Code Review", "Ready to be merged", "Done" helped us keep track of changes/bugs/reviews and most important, the stage of the development of our project.

  <p align="center">
  <b> How our Trello board looks during the development:</b>
  </p>
  
 <div style="text-align: center;">
    <img src="./screenshots/Trello board.png">
  </div>

---
### Design/ architecture/ UML
&emsp; The design of our app can be seen in the following diagrams that suggest the flow of the app and the way the database was organized in tables:

  <p align="center">
  <b>State Diagram</b>
  </p>
  <div style="text-align: center;">
    <img src="./screenshots/State-Diagram.png">
  </div>
  
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
### Source control
&emsp; We made use of the Github platform in order to work on this project easily, by creating branches for a specific task, merging them to master when reviews where positive and commiting work anytime something was done. Moreover, Git/Github helped us work separately on different features at the same time.

---
### Unit tests
&emsp; We used Jest, a simple framework that helped us test the functionalities of our app. We came to the conclusion that login & register were of high importance in the app, so unit tests were made for these 2 components in order to make sure everything works as planned.

---
### Bug reporting
&emsp; We used [issues](https://github.com/Andrei0872/trip-designer/issues) on Github to track bugs and problems that occurred during the software development.

---
### Build tool

&emsp; We used `npm` to manage dependencies, along with `docker` and `docker-compose` to quickly spin up the **server** application and its dependencies: a **Postgres database** and **redis**.
As a side note, there is a **pgAdmin** container whereby the database schema can be visualized.

---
### Refactoring and code standards
&emsp; When a feature was considered finished, a [pull request](https://github.com/Andrei0872/trip-designer/pulls) was created so that other team members could give feedback and review the work. We then made changes to the code according to the review content. In that way, we made sure the code was clean and functional before merging to master and that everyone's opinion was taken into consideration. In parallel, we discussed different ideas and issues on the Trello board as well.

---
### Design patterns

As far as React is concerned, we've used **2 design patterns**(among others, possibly):

* *Presentational and Container Component Pattern*: it helps **separating** the **business logic** from the **view logic**; the **container components**(also called *smart components*) are responsible for fetching the data and communicating with external providers, whereas **presentational components**(also referred to as *dumb components*) are only concerned with displaying data and nothing else
* *Provider Pattern*: it is used to avoid a common problem in React applications, which is **prop drilling**; the way it works it that data is stored at a certain level of the component tree so that it is always available to some subtrees; an example of that is how we store the user data after they log in - that data is available across all components.


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
