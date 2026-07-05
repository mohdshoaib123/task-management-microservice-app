# Task App

A full-stack task management application with a React frontend, Node.js/Express microservices, and Kafka-based event flow and redis implementation.

## Overview

This project includes:
- A React frontend for task management UI
- An API gateway for routing requests
- A task service for task CRUD operations
- A user service for authentication, user management, and email verification
- Kafka and Redis integration for async and caching workflows

## Tech Stack


- Backend: Node.js, Express, TypeScript
- Databases: PostgreSQL (task service), MongoDB (user service)
- Messaging: Kafka
- Caching: Redis
- Container support: Docker

## Project Structure

- frontend/ - React application
- api-gateway/ - Express API gateway
- backend/services/task-service/ - Task microservice
- backend/services/user-service/ - User microservice
- docker-compose.yml - Kafka and Zookeeper services

## Prerequisites

Make sure you have installed:
- Node.js (v18 or higher)
- npm or yarn
- Docker and Docker Compose
- PostgreSQL
- MongoDB
- Redis

## Environment Variables

Create .env files in each service with the required variables.

### API Gateway
- PORT
- CLIENT_URL
- REDIS_URL
- USER_SERVICE_URL
- TASK_SERVICE_URL
- NODE_ENV

### Task Service
- PORT
- POST_DB_URL
- SECRET_TOKEN
- NODE_ENV
- CLIENT_URL
- REDIS_URL

### User Service
- PORT
- DB_URL
- CLIENT_ID
- CLIENT_SECRET
- REFRESH_TOKEN
- EMAIL_USER
- NODE_ENV
- SECRET_TOKEN
- CLIENT_URL

## Run Locally

### 1) Clone the repository

```bash
git clone <your-repo-url>
cd task-app
```

### 2) Start Kafka infrastructure

```bash
docker compose up -d
```

### 3) Install dependencies

```bash
cd frontend && npm install
cd ../api-gateway && npm install
cd ../backend/services/task-service && npm install
cd ../user-service && npm install
```

### 4) Start the services

Run each service in a separate terminal:

```bash
cd api-gateway
npm run dev
```

```bash
cd backend/services/task-service
npm run dev
```

```bash
cd backend/services/user-service
npm run dev
```

```bash
cd frontend
npm run dev
```

The frontend will typically run on Vite's default port, and the backend services will start based on the PORT values configured in your environment.

## Build for Production

```bash
cd frontend && npm run build
cd api-gateway && npm run build
cd backend/services/task-service && npm run build
cd backend/services/user-service && npm run build
```

## Features

- User registration and login
- Email verification flow
- Task creation, update, view, and deletion
- Protected routes
- API gateway routing
- Redis-backed caching and rate limiting

## Notes

- Kafka is currently configured through Docker Compose.
- Make sure Redis, PostgreSQL, and MongoDB are running before starting the backend services.
- Update the environment variables according to your local setup.

## License

This project is licensed under the ISC License.
