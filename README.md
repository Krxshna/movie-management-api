
# Movie Management API

**Movie Management API** – a modern, full-featured Node.js/Express backend for managing movies, participants (actors, directors, producers), and user authentication. Built for speed, security, and developer happiness!

---

## Features

- **RESTful API** for Movies & Participants
- **JWT Authentication** for secure access
- **Swagger Docs** at `/docs` for instant API exploration
- **MongoDB** for persistent storage (via Mongoose)
- **Rate Limiting** and **Validation** for robust endpoints
- **RabbitMQ** integration for async messaging
- **Health Checks** and custom logging
- **Environment-based config** with `.env` support

---

## Quickstart

1. **Clone & Install**
	```bash
	git clone https://github.com/Krxshna/movie-management-api.git
	cd movie-management-api
	npm install
	```

2. **Configure Environment**
	- Copy `.env.example` to `.env` and set your variables (MongoDB URI, JWT secret, etc).

3. **Run the API**
	```bash
	npm run dev
	# or
	npm start
	```

4. **Explore the API**
	- Visit [http://localhost:8000/docs](http://localhost:8000/docs) for interactive Swagger documentation.

---

## API Overview

### Authentication

- `POST /auth/register` – Register a new user
- `POST /auth/login` – Login and receive a JWT

### Movies

- `GET /movies` – List all movies
- `POST /movies` – Add a new movie (auth required)
- `GET /movies/:id` – Get movie details
- `PUT /movies/:id` – Update a movie (auth required)
- `DELETE /movies/:id` – Delete a movie (auth required)

### Participants

- `GET /participants` – List all participants
- `POST /participants` – Add a participant (auth required)
- `GET /participants/:id` – Get participant details
- `PUT /participants/:id` – Update participant (auth required)
- `DELETE /participants/:id` – Delete participant (auth required)

### Utilities

- `GET /healthCheck` – Health check endpoint
- `GET /ping` – Simple ping with logId

---

## Tech Stack

- **Node.js** + **Express**
- **MongoDB** (Mongoose)
- **RabbitMQ**
- **Swagger (OpenAPI)**
- **JWT Auth**
- **ESLint** for code quality

---

## Example .env

```
PORT=8000
MONGODB_URI=mongodb://localhost:27017/movies
JWT_SECRET=your_jwt_secret
RABBITMQ_URL=amqp://localhost
```

---

## Dev Scripts

- `npm run dev` – Start with nodemon (auto-reload)
- `npm start` – Start in production mode
- `npm run lint` – Lint code
- `npm run krishna` – Custom log service

---

## Project Structure

```
src/
  controllers/    # Route handlers for movies, participants, users
  services/       # Business logic
  middlewares/    # Auth, validation, rate limiting, etc.
  config/         # DB, RabbitMQ configs
  lib/            # Logging utilities
  ...
swagger.yml       # OpenAPI spec
```

---

## Note

This project is for **learning purposes** only. Feel free to explore, modify, and use it as a reference for your own Node.js/Express API projects!
