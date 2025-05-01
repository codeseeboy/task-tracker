# Task Tracker Application Backend

A robust backend for a Task Tracker application built with Express.js, TypeScript, and MongoDB. This application allows users to manage projects and tasks with proper authentication.

## Features

- User authentication (signup, login) with JWT
- Project management (create, read, update, delete)
- Task management (create, read, update, delete)
- Data validation using Joi
- Error handling middleware
- Microservice architecture

## Requirements

- Node.js (v14 or higher)
- MongoDB
- TypeScript

## Installation

1. Clone the repository:
\`\`\`bash
git clone <https://github.com/yourusername/task-tracker-backend.git>
cd task-tracker-backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a `.env` file in the root directory with the following variables:
\`\`\`
PORT=5000
MONGO_URI=mongodb://localhost:27017/task-tracker
JWT_SECRET=your-secret-key
\`\`\`

4. Build the application:
\`\`\`bash
npm run build
\`\`\`

5. Start the server:
\`\`\`bash
npm start
\`\`\`

For development:
\`\`\`bash
npm run dev
\`\`\`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login a user

### User

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Projects

- `POST /api/projects` - Create a new project
- `GET /api/projects` - Get all projects for a user
- `GET /api/projects/:projectId` - Get a project by ID
- `PUT /api/projects/:projectId` - Update a project
- `DELETE /api/projects/:projectId` - Delete a project

### Tasks

- `POST /api/tasks` - Create a new task
- `GET /api/tasks?projectId=:projectId` - Get all tasks for a project
- `GET /api/tasks/:taskId` - Get a task by ID
- `PUT /api/tasks/:taskId` - Update a task
- `DELETE /api/tasks/:taskId` - Delete a task

## Project Structure

\`\`\`
src/
├── config/           # Configuration files
├── controller/       # Request handlers
├── dao/              # Data Access Objects
├── dto/              # Data Transfer Objects
├── enums/            # Enumerations
├── middlewares/      # Express middlewares
├── router/           # Express routes
├── schemas/          # Validation schemas and models
├── service/          # Business logic
├── utils/            # Utility functions
├── app.ts            # Express app
└── server.ts         # Server entry point
\`\`\`

## License

This project is licensed under the ISC License.
