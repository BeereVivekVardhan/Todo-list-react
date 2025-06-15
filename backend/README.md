# Todo List Backend API

A RESTful API for a Todo List application built with Express, TypeScript, and MongoDB.

## Features

- Create, read, update, and delete todos
- MongoDB database with Mongoose ODM
- TypeScript for type safety
- RESTful API design
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

## Installation

1. Clone this repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/todolist
   ```
   (Adjust the MongoDB URI as needed)

## Development

To start the development server:

```
npm run dev
```

## Production

To build for production:

```
npm run build
```

To start the production server:

```
npm start
```

## API Endpoints

| Method | Endpoint      | Description       |
|--------|---------------|-------------------|
| GET    | /api/todos    | Get all todos     |
| GET    | /api/todos/:id| Get a single todo |
| POST   | /api/todos    | Create a new todo |
| PUT    | /api/todos/:id| Update a todo     |
| DELETE | /api/todos/:id| Delete a todo     |

## Request & Response Examples

### Get all todos

**Request:**
```
GET /api/todos
```

**Response:**
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Complete project",
    "description": "Finish the todo list app",
    "completed": false,
    "createdAt": "2023-06-22T18:30:00.000Z",
    "updatedAt": "2023-06-22T18:30:00.000Z"
  },
  {
    "_id": "60d21b4667d0d8992e610c86",
    "title": "Learn TypeScript",
    "description": "Study advanced TypeScript features",
    "completed": true,
    "createdAt": "2023-06-21T15:20:00.000Z",
    "updatedAt": "2023-06-21T18:30:00.000Z"
  }
]
```
