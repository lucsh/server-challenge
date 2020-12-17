# Guide

## Getting started

### Install redis

[https://redis.io/topics/quickstart](https://redis.io/topics/quickstart)

Or use the redis docker

`docker run --name redis --restart unless-stopped -p 6379:6379 -d redis`

## Cloning and serving locally

### Clone the repo

```bash
git clone url
```

### Install dependencies

```bash
cd server-challenge
nvm i
npm i
```

### Create a .env file

```bash
cp .example.env .env
```

### Run

```bash
npm start
```

## Testing

```bash
npm test
```

## Building and Using the docker image

### Build the image

`docker build -f infrastructure/Dockerfile -t challenge-server:latest .`

### Running the image

`docker run --name challenge-server -p 3030:3030 -d challenge-server:latest`

# Usage

The REST API to the Challenge app is described below.

## Get a list of timezones

### Request

`GET /timezones/`

    curl -i -H 'Accept: application/json' http://localhost:3030/timezones/

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 1
    ETag: W/"1afa-2zAGZazEc6yRF6mtt5Bt4XEvOjU"
    Date: Tue, 15 Dec 2020 17:32:53 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    []

### Request

`GET /timezones/:name`

    curl -i -H 'Accept: application/json' http://localhost:3030/timezones/America%2FArgentina%2FBuenos_Aires

### Response

    HTTP/1.1 200 OK
    Vary: Origin
    Content-Type: application/json; charset=utf-8
    Content-Length: 88
    ETag: W/"58-J5btNU6pPs0NOeem5ocYpcbMFgM"
    Date: Wed, 16 Dec 2020 14:16:00 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      timezone
      time
      date
    }

### Request

`PUT /timezones/:name`

    curl -i -H 'Accept: application/json' -H 'x-idempotence-key: XXX-YYY' -X PUT http://localhost:3030/timezones/America%2FArgentina%2FBuenos_Aires

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 1
    ETag: W/"57-8YKHFIcFWplcL5N/6q0rEoTdKkM"
    Date: Tue, 15 Dec 2020 19:26:01 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5

    {
      message
    }

### Request

`DELETE /timezones/:name`

    curl -i -H 'Accept: application/json' -H 'x-idempotence-key: XXX-XXX' -X DELETE http://localhost:3030/timezones/America%2FArgentina%2FBuenos_Aires

### Response

    HTTP/1.1 204 No Content
    ETag: W/"3d-OATd44s2lGwA/itCm1VnEuTyzV8"
    Date: Tue, 15 Dec 2020 19:34:32 GMT
    Connection: keep-alive
    Keep-Alive: timeout=5
