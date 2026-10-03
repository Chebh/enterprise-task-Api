# Enterprise Task API

Secure Task Management REST API built with Java 25, Spring Boot, PostgreSQL & JWT.

## Features
- JWT Authentication (Register / Login)
- Task Ownership (users only see their own tasks)
- Full CRUD
- Validation + Global Exception Handling
- PostgreSQL
- Docker ready

## Auth Endpoints
- POST `/api/auth/register`
- POST `/api/auth/login`

## Protected Task Endpoints
All require header: `Authorization: Bearer <token>`

- POST   `/api/tasks`
- GET    `/api/tasks`
- GET    `/api/tasks/{id}`
- PUT    `/api/tasks/{id}`
- DELETE `/api/tasks/{id}`

## Author
Brian Njuguna