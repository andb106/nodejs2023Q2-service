# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading repository and change branch

```
git clone https://github.com/andb106/nodejs2023Q2-service.git

git checkout develop-part2
```

## Installing NPM modules

```
npm install
```

## Installing Docker

```
Install [Docker](https://docs.docker.com/engine/install/)

after installing run docker
```


## Running application using docker

```
docker compose up
```

The app starts on port (4000 as default)
To change port use .env file
Available endpoints description: https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```
