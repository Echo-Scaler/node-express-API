# Simple Task Management API

A RESTful API built with Node.js, Express, and MongoDB for managing tasks. This is a real-world example API that demonstrates CRUD operations, proper error handling, and MongoDB integration.

## 📋 Features

- ✅ Create, Read, Update, and Delete (CRUD) tasks
- ✅ MongoDB database integration with Mongoose
- ✅ Input validation and error handling
- ✅ RESTful API design
- ✅ CORS enabled
- ✅ Request logging with Morgan
- ✅ Environment variable configuration

## 🚀 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Other:** dotenv, cors, morgan

## 📁 Project Structure

```
simple-api-nodejs/
├── src/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   └── taskController.js  # Task CRUD logic
│   ├── models/
│   │   └── taskModel.js       # Task schema
│   ├── routes/
│   │   └── taskRoutes.js      # API routes
│   └── index.js               # App entry point
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)

### Steps

1. **Clone the repository** (or navigate to the project directory)

```bash
cd simple-api-nodejs
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskdb
```

For MongoDB Atlas, use:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskdb
```

4. **Start the server**

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Base URL

```
http://localhost:5000
```

### Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| GET    | `/`              | API welcome message     |
| GET    | `/api/tasks`     | Get all tasks           |
| GET    | `/api/tasks/:id` | Get a single task by ID |
| POST   | `/api/tasks`     | Create a new task       |
| PUT    | `/api/tasks/:id` | Update a task by ID     |
| DELETE | `/api/tasks/:id` | Delete a task by ID     |

## 🔧 API Usage Examples

### 1. Get all tasks

**Request:**

```bash
curl http://localhost:5000/api/tasks
```

**Response:**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Complete project documentation",
      "description": "Write comprehensive README and API docs",
      "status": "in-progress",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 2. Create a new task

**Request:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build authentication system",
    "description": "Implement JWT-based authentication",
    "status": "pending",
    "dueDate": "2024-02-01"
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Build authentication system",
    "description": "Implement JWT-based authentication",
    "status": "pending",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 3. Get a single task

**Request:**

```bash
curl http://localhost:5000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k2
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Build authentication system",
    "description": "Implement JWT-based authentication",
    "status": "pending",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 4. Update a task

**Request:**

```bash
curl -X PUT http://localhost:5000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k2 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "completed"
  }'
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Build authentication system",
    "description": "Implement JWT-based authentication",
    "status": "completed",
    "dueDate": "2024-02-01T00:00:00.000Z",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T12:30:00.000Z"
  }
}
```

### 5. Delete a task

**Request:**

```bash
curl -X DELETE http://localhost:5000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k2
```

**Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

## 📊 Task Schema

| Field       | Type   | Required | Default   | Description                                         |
| ----------- | ------ | -------- | --------- | --------------------------------------------------- |
| title       | String | Yes      | -         | Task title                                          |
| description | String | Yes      | -         | Task description                                    |
| status      | String | No       | `pending` | Task status (`pending`, `in-progress`, `completed`) |
| dueDate     | Date   | No       | -         | Task due date                                       |
| createdAt   | Date   | Auto     | -         | Creation timestamp                                  |
| updatedAt   | Date   | Auto     | -         | Last update timestamp                               |

## 🧪 Testing with Postman

1. Import the following collection or create requests manually
2. Set the base URL to `http://localhost:5000`
3. Test each endpoint with appropriate HTTP methods and request bodies

## 🐛 Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

Example error response:

```json
{
  "success": false,
  "message": "Task not found"
}
```

## 🔒 Security Considerations

For production use, consider adding:

- Authentication (JWT)
- Rate limiting
- Input sanitization
- Helmet.js for security headers
- Data validation middleware (e.g., express-validator)

## 📝 License

ISC

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!
