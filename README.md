# Finance Data Processing and Access Control Backend System

Production-ready backend built with Node.js, Express, Sequelize ORM, SQLite, JWT authentication, bcrypt password hashing, Joi validation, and Swagger API documentation.

## Tech Stack

- Node.js
- Express.js
- Sequelize ORM
- SQLite
- JWT
- bcrypt
- Joi
- Swagger (swagger-jsdoc and swagger-ui-express)

## Folder Structure

src/
├── controllers/
├── services/
├── models/
├── routes/
├── middleware/
├── config/
├── validations/
├── docs/
└── app.js

Root:

- server.js
- .env.example
- package.json
- README.md

## Setup

1. Install dependencies

   npm install

2. Create environment file

   copy .env.example .env

3. Start in development mode

   npm run dev

4. Start in production mode

   npm start

## Base URLs

- API root: http://localhost:5000/
- Health: http://localhost:5000/health
- Swagger UI: http://localhost:5000/api-docs

## Authentication

Use Bearer token from login response for protected routes:

Authorization: Bearer YOUR_JWT_TOKEN

## RBAC

- ADMIN: full access
- ANALYST: read records plus analytics
- VIEWER: read records only

## API Endpoints

### Users

- POST /api/users/register
- POST /api/users/login
- GET /api/users
- PUT /api/users/:id
- PATCH /api/users/status

### Financial Records

- POST /api/records
- GET /api/records
- PUT /api/records/:id
- DELETE /api/records/:id

Filters for GET /api/records:

- type=INCOME|EXPENSE
- category=string
- startDate=YYYY-MM-DD
- endDate=YYYY-MM-DD

### Dashboard

- GET /api/dashboard/summary
- GET /api/dashboard/category-wise
- GET /api/dashboard/trends
- GET /api/dashboard/recent

## Standard Error Response

{
  "success": false,
  "message": "Error message"
}

## Notes

- Passwords are hashed with bcrypt and never exposed in API responses.
- Sequelize uses SQLite database file configured via DB_FILE.
- Route mounting is under /api/* and 404 handler is mounted last.
