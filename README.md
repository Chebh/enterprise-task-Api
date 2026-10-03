# Enterprise Task API

A clean, enterprise-style Task Management REST API built with **Java 25** and **Spring Boot**.

## Features
- Full CRUD operations for Tasks
- Proper layered architecture (Controller → Service → Repository)
- DTOs for request/response
- Input validation
- Global exception handling
- H2 in-memory database (easy to switch to PostgreSQL later)
- Automatic timestamps

## Tech Stack
- Java 25
- Spring Boot 4.x
- Spring Data JPA
- H2 Database
- Maven
- Validation

## API Endpoints

| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| POST   | `/api/tasks`          | Create a new task    |
| GET    | `/api/tasks`          | Get all tasks        |
| GET    | `/api/tasks/{id}`     | Get task by ID       |
| PUT    | `/api/tasks/{id}`     | Update a task        |
| DELETE | `/api/tasks/{id}`     | Delete a task        |

## How to Run

```bash
./mvnw spring-boot:run