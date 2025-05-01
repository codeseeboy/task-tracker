# Task Tracker API

A comprehensive REST API for a Task Tracker application built with Express.js, TypeScript, and MongoDB. This application allows users to manage projects and tasks with proper authentication.

## Table of Contents

- [Task Tracker API](#task-tracker-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setup Steps](#setup-steps)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
    - [Local Development](#local-development)
    - [Production](#production)
    - [Authentication](#authentication)
      - [Register a new user](#register-a-new-user)
      - [Login a user](#login-a-user)
    - [User Management](#user-management)
      - [Get user profile](#get-user-profile)
      - [Update user profile](#update-user-profile)
    - [Project Management](#project-management)
      - [Create a new project](#create-a-new-project)
      - [Get all projects for a user](#get-all-projects-for-a-user)
      - [Get a project by ID](#get-a-project-by-id)
      - [Update a project](#update-a-project)
      - [Delete a project](#delete-a-project)
    - [Task Management](#task-management)
      - [Create a new task](#create-a-new-task)
      - [Get all tasks for a project](#get-all-tasks-for-a-project)
      - [Get a task by ID](#get-a-task-by-id)
      - [Update a task](#update-a-task)
      - [Delete a task](#delete-a-task)
  - [Database Schema](#database-schema)
    - [User Schema](#user-schema)
    - [Project Schema](#project-schema)
    - [Task Schema](#task-schema)
  - [Project Structure](#project-structure)
  - [Error Handling](#error-handling)
  - [Security Measures](#security-measures)
  - [Performance Optimizations](#performance-optimizations)

## Features

- User authentication (signup, login) with JWT
- User profile management
- Project management (create, read, update, delete)
- Task management with status tracking
- Data validation using Joi
- Error handling middleware
- Microservice architecture
- Production-ready configuration

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, Express Rate Limit

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup Steps

1. Clone the repository:

```bash
git clone https://github.com/codeseeboy/task-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory
4. Update the environment variables in the `.env` file with your values.
5. Build the application:

```bash
npm run build
```

6. Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

## Environment Variables

```
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=info

# Database Configuration
MONGO_URI=mongodb+srv://your_username:your_password@cluster0.example.mongodb.net/task-tracker?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h
```

## Database Setup

### Local Development

MongoDB will run on `mongodb://localhost:27017/task-tracker` by default.

### Production

For production, it's recommended to use a managed MongoDB service like:

- MongoDB Atlas

Update the `MONGO_URI` environment variable with your production database connection string.

### Authentication

#### Register a new user

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Auth required**: No

**Request Body**:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "country": "United States"
}
```

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "country": "United States"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response**:

- **Code**: 400 Bad Request
- **Content**:

```json
{
  "message": "name is required"
}
```

OR

- **Code**: 409 Conflict
- **Content**:

```json
{
  "message": "User with this email already exists"
}
```

#### Login a user

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth required**: No

**Request Body**:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "user": {
    "_id": "60d21b4667d0d8992e610c85",
    "name": "John Doe",
    "email": "john@example.com",
    "country": "United States"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "User not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Invalid credentials"
}
```

### User Management

#### Get user profile

- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Doe",
  "email": "john@example.com",
  "country": "United States"
}
```

**Error Response**:

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

OR

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "User not found"
}
```

#### Update user profile

- **URL**: `/api/users/profile`
- **Method**: `PUT`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**:

```json
{
  "name": "John Smith",
  "country": "Canada"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "John Smith",
  "email": "john@example.com",
  "country": "Canada"
}
```

**Error Response**:

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

OR

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "User not found"
}
```

### Project Management

#### Create a new project

- **URL**: `/api/projects`
- **Method**: `POST`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**:

```json
{
  "name": "Website Redesign",
  "description": "Redesign the company website with modern UI/UX"
}
```

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "name": "Website Redesign",
  "description": "Redesign the company website with modern UI/UX",
  "userId": "60d21b4667d0d8992e610c85",
  "createdAt": "2023-06-22T10:30:00.000Z",
  "updatedAt": "2023-06-22T10:30:00.000Z"
}
```

**Error Response**:

- **Code**: 400 Bad Request
- **Content**:

```json
{
  "message": "User can have a maximum of 4 projects"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Get all projects for a user

- **URL**: `/api/projects`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c86",
    "name": "Website Redesign",
    "description": "Redesign the company website with modern UI/UX",
    "userId": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-22T10:30:00.000Z",
    "updatedAt": "2023-06-22T10:30:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c87",
    "name": "Mobile App Development",
    "description": "Develop a mobile app for iOS and Android",
    "userId": "60d21b4667d0d8992e610c85",
    "createdAt": "2023-06-22T11:00:00.000Z",
    "updatedAt": "2023-06-22T11:00:00.000Z"
  }
]
```

**Error Response**:

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Get a project by ID

- **URL**: `/api/projects/:projectId`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "name": "Website Redesign",
  "description": "Redesign the company website with modern UI/UX",
  "userId": "60d21b4667d0d8992e610c85",
  "createdAt": "2023-06-22T10:30:00.000Z",
  "updatedAt": "2023-06-22T10:30:00.000Z"
}
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Project not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Update a project

- **URL**: `/api/projects/:projectId`
- **Method**: `PUT`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**:

```json
{
  "name": "Website Redesign 2.0",
  "description": "Redesign the company website with modern UI/UX and improved performance"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c86",
  "name": "Website Redesign 2.0",
  "description": "Redesign the company website with modern UI/UX and improved performance",
  "userId": "60d21b4667d0d8992e610c85",
  "createdAt": "2023-06-22T10:30:00.000Z",
  "updatedAt": "2023-06-22T12:00:00.000Z"
}
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Project not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Delete a project

- **URL**: `/api/projects/:projectId`
- **Method**: `DELETE`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 204 No Content

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Project not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

### Task Management

#### Create a new task

- **URL**: `/api/tasks`
- **Method**: `POST`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**:

```json
{
  "title": "Design Homepage",
  "description": "Create a modern homepage design with responsive layout",
  "status": "TODO",
  "projectId": "60d21b4667d0d8992e610c86"
}
```

**Success Response**:

- **Code**: 201 Created
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "title": "Design Homepage",
  "description": "Create a modern homepage design with responsive layout",
  "status": "TODO",
  "projectId": "60d21b4667d0d8992e610c86",
  "createdAt": "2023-06-22T13:00:00.000Z",
  "completedAt": null,
  "updatedAt": "2023-06-22T13:00:00.000Z"
}
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Project not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Get all tasks for a project

- **URL**: `/api/tasks?projectId=:projectId`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
[
  {
    "_id": "60d21b4667d0d8992e610c88",
    "title": "Design Homepage",
    "description": "Create a modern homepage design with responsive layout",
    "status": "TODO",
    "projectId": "60d21b4667d0d8992e610c86",
    "createdAt": "2023-06-22T13:00:00.000Z",
    "completedAt": null,
    "updatedAt": "2023-06-22T13:00:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c89",
    "title": "Implement Header Component",
    "description": "Create a reusable header component with navigation",
    "status": "IN_PROGRESS",
    "projectId": "60d21b4667d0d8992e610c86",
    "createdAt": "2023-06-22T13:30:00.000Z",
    "completedAt": null,
    "updatedAt": "2023-06-22T13:30:00.000Z"
  }
]
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Project not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Get a task by ID

- **URL**: `/api/tasks/:taskId`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "title": "Design Homepage",
  "description": "Create a modern homepage design with responsive layout",
  "status": "TODO",
  "projectId": "60d21b4667d0d8992e610c86",
  "createdAt": "2023-06-22T13:00:00.000Z",
  "completedAt": null,
  "updatedAt": "2023-06-22T13:00:00.000Z"
}
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Task not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Update a task

- **URL**: `/api/tasks/:taskId`
- **Method**: `PUT`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Request Body**:

```json
{
  "title": "Design Homepage and Footer",
  "description": "Create a modern homepage design with responsive layout and footer",
  "status": "IN_PROGRESS"
}
```

**Success Response**:

- **Code**: 200 OK
- **Content**:

```json
{
  "_id": "60d21b4667d0d8992e610c88",
  "title": "Design Homepage and Footer",
  "description": "Create a modern homepage design with responsive layout and footer",
  "status": "IN_PROGRESS",
  "projectId": "60d21b4667d0d8992e610c86",
  "createdAt": "2023-06-22T13:00:00.000Z",
  "completedAt": null,
  "updatedAt": "2023-06-22T14:00:00.000Z"
}
```

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Task not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

#### Delete a task

- **URL**: `/api/tasks/:taskId`
- **Method**: `DELETE`
- **Auth required**: Yes (JWT token in Authorization header)

**Headers**:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response**:

- **Code**: 204 No Content

**Error Response**:

- **Code**: 404 Not Found
- **Content**:

```json
{
  "message": "Task not found"
}
```

OR

- **Code**: 401 Unauthorized
- **Content**:

```json
{
  "message": "Access token is required"
}
```

## Database Schema

### User Schema

```typescript
{
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}
```

### Project Schema

```typescript
{
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}
```

### Task Schema

```typescript
{
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["TODO", "IN_PROGRESS", "REVIEW", "DONE"],
    default: "TODO",
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  completedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}
```

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── db.config.ts  # Database configuration
│   └── constants.config.ts # Application constants
├── controller/       # Request handlers
│   ├── Auth.controller.ts
│   ├── User.controller.ts
│   ├── Project.controller.ts
│   └── Task.controller.ts
├── dao/              # Data Access Objects
│   ├── User.dao.ts
│   ├── Project.dao.ts
│   └── Task.dao.ts
├── dto/              # Data Transfer Objects
│   ├── User.dto.ts
│   ├── Project.dto.ts
│   └── Task.dto.ts
├── middlewares/      # Express middlewares
│   └── auth.middleware.ts
├── router/           # Express routes
│   ├── Auth.router.ts
│   ├── User.router.ts
│   ├── Project.router.ts
│   └── Task.router.ts
├── schemas/          # Validation schemas and models
│   ├── User.schema.ts
│   ├── Project.schema.ts
│   ├── Task.schema.ts
│   └── models/
│       ├── User.model.ts
│       ├── Project.model.ts
│       └── Task.model.ts
├── service/          # Business logic
│   ├── Auth.service.ts
│   ├── User.service.ts
│   ├── Project.service.ts
│   └── Task.service.ts
├── utils/            # Utility functions
│   ├── error-handler.util.ts
│   ├── errors.util.ts
│   └── http-codes.util.ts
├── app.ts            # Express app
└── server.ts         # Server entry point
```

## Error Handling

The API uses a centralized error handling mechanism with custom error classes:

- `BaseError`: Base error class with HTTP status code
- `NotFoundError`: For resource not found (404)
- `BadRequestError`: For invalid requests (400)
- `UnauthorizedError`: For authentication errors (401)
- `ForbiddenError`: For authorization errors (403)
- `RequestValidationError`: For validation errors (400)

All errors are handled by the error handling middleware in `app.ts`.

## Security Measures

1. **Authentication**: JWT-based authentication with token expiration
2. **Password Security**: Passwords are hashed using bcrypt
3. **Input Validation**: All inputs are validated using Joi
4. **HTTP Security Headers**: Implemented using Helmet
5. **Rate Limiting**: Prevents abuse of the API
6. **CORS**: Configurable CORS settings
7. **Request Size Limiting**: Prevents large payload attacks

## Performance Optimizations

1. **Database Indexes**: Created for frequently queried fields
2. **Connection Pooling**: Optimized MongoDB connection
3. **Response Compression**: Using compression middleware
4. **Proper Error Handling**: Prevents server crashes
5. **Stateless Design**: Allows for horizontal scaling
