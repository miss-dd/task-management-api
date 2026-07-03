# task-management-api

# NodeJS Task API

A lightweight REST API built with **Node.js** and **Express** for managing tasks, using simple **JSON file persistence** instead of a database. This project is designed as a DevOps portfolio piece — the API itself is intentionally simple so the focus can shift toward containerization, CI/CD, and deployment automation in later phases.

---

## 📋 Overview

NodeJS Task API provides basic CRUD operations for managing a task list. Tasks are persisted to a local JSON file (`data/tasks.json`), making the project easy to run without external database dependencies while still demonstrating real-world API design patterns: routing, error handling, and a health check endpoint for monitoring.

This project is the foundation for a broader DevOps pipeline:

1. **Phase 1 (current):** Build and run the API locally.
2. **Phase 2:** Containerize the app with Docker.
3. **Phase 3:** Push images to Docker Hub.
4. **Phase 4:** Automate build/test/deploy with GitHub Actions.

---

## 🏗️ Architecture

```
nodejs-task-api/
├── data/
│   └── tasks.json        # JSON file used as the persistence layer
├── routes/
│   └── tasks.js           # Express route handlers for /tasks endpoints
├── utils/
│   └── fileStore.js       # Read/write helper functions for tasks.json
├── .env.example            # Sample environment variable configuration
├── package.json
└── server.js               # Application entry point
```

**Design notes:**
- `server.js` initializes the Express app, applies middleware, and mounts the `tasks` router.
- `routes/tasks.js` defines the API endpoints and delegates data operations to `utils/fileStore.js`.
- `utils/fileStore.js` abstracts file read/write logic, so the persistence mechanism (JSON file today) could later be swapped for a real database with minimal changes to the route layer.
- `data/tasks.json` acts as the "database," storing an array of task objects.

---

## ✨ Features

- ✅ Create tasks
- ✅ Read tasks (single or all)
- ✅ Update tasks
- ✅ Delete tasks
- ✅ Health check endpoint for uptime/monitoring checks
- ✅ File-based persistence (no external DB required)
- ✅ Centralized error handling

---

## ⚙️ Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm (bundled with Node.js)

### Steps

```bash
# Clone the repository
git clone https://github.com/<your-username>/nodejs-task-api.git
cd nodejs-task-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit `.env` as needed (e.g., to change the port):

```env
PORT=3000
```

---

## ▶️ Running Locally

```bash
# Start the server
npm start

# Or, if a dev script with hot-reload (e.g., nodemon) is configured
npm run dev
```

By default, the API will be available at:

```
http://localhost:3000
```

Verify it's running:

```bash
curl http://localhost:3000/health
```

---

## 🔌 API Endpoints

| Method | Endpoint         | Description                  |
|--------|------------------|-------------------------------|
| GET    | `/health`        | Health check for the service |
| GET    | `/tasks`         | Retrieve all tasks           |
| GET    | `/tasks/:id`     | Retrieve a single task by ID |
| POST   | `/tasks`         | Create a new task            |
| PUT    | `/tasks/:id`     | Update an existing task      |
| DELETE | `/tasks/:id`     | Delete a task                |

### Example: Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write README", "completed": false}'
```

### Example: Get All Tasks

```bash
curl http://localhost:3000/api/tasks
```

### Example: Update a Task

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

### Example: Delete a Task

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### Error Handling

The API returns consistent JSON error responses, e.g.:

```json
{
  "error": "Task not found"
}
```

Common status codes:
- `200 OK` – Successful request
- `201 Created` – Resource created
- `400 Bad Request` – Invalid input
- `404 Not Found` – Resource doesn't exist
- `500 Internal Server Error` – Unexpected server error

---

## 🚀 Future Improvements

- Replace JSON file persistence with a real database (PostgreSQL / MongoDB)
- Add request validation (e.g., using `Joi` or `express-validator`)
- Add authentication/authorization (JWT-based)
- Add pagination and filtering for the `/tasks` endpoint
- Add unit and integration tests (Jest + Supertest)
- Add API documentation via Swagger/OpenAPI
- Add structured logging (e.g., Winston or Pino)

---

## 🛠️ DevOps Roadmap

This project is being built incrementally to showcase a full DevOps workflow:

- [x] Build REST API with Express
- [x] Implement JSON file persistence
- [x] Add health check endpoint
- [ ] **Dockerize** the application (multi-stage `Dockerfile`, `.dockerignore`)
- [ ] Push Docker image to **Docker Hub**
- [ ] Set up **GitHub Actions** CI pipeline (lint, test, build)
- [ ] Set up **GitHub Actions** CD pipeline (build image → push to Docker Hub → deploy)
- [ ] Deploy to a cloud environment (e.g., AWS ECS, EC2, or Render)
- [ ] Add container health checks and monitoring
- [ ] Add infrastructure-as-code (Terraform) for provisioning

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.