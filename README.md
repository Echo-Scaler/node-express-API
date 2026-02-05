# Task Management API with Modern Web UI

[![GitHub](https://img.shields.io/badge/GitHub-Echo--Scaler%2Fnode--express--API-blue?logo=github)](https://github.com/Echo-Scaler/node-express-API)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green?logo=node.js)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Express-Framework-lightgrey?logo=express)](https://expressjs.com)

A **production-ready** full-stack task management application with a RESTful API backend and modern, responsive web UI. Built with Node.js, Express, and MongoDB.

## ✨ Features

### Backend API

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ MongoDB database integration with Mongoose
- ✅ RESTful API design
- ✅ Input validation and error handling
- ✅ CORS enabled
- ✅ Request logging with Morgan
- ✅ Environment variable configuration

### Modern Web UI

- 🎨 Beautiful gradient design with smooth animations
- 📱 Fully responsive layout (mobile-friendly)
- 🔍 Filter tasks by status (All, Pending, In Progress, Completed)
- 📊 Real-time statistics dashboard
- ✏️ **Markdown support** in task descriptions
- 🎯 Modal-based editing
- 🚀 Instant updates without page reload
- 🛡️ XSS protection with DOMPurify

## 🚀 Tech Stack

**Backend:**

- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB ODM

**Frontend:**

- Vanilla JavaScript (ES6+)
- HTML5 & CSS3
- Marked.js - Markdown parsing
- DOMPurify - XSS protection

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
├── public/                     # Frontend UI
│   ├── index.html             # Main HTML
│   ├── styles.css             # Styling with animations
│   └── app.js                 # Frontend logic
├── .env                       # Environment variables
├── .env.example               # Environment template
├── .gitignore
├── package.json
├── CRUD_EXAMPLES.md           # API usage examples
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/Echo-Scaler/node-express-API.git
cd node-express-API
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/taskdb
```

For MongoDB Atlas (cloud), use:

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

The server will start on `http://localhost:3000`

5. **Access the Web UI**

Open your browser and navigate to:

```
http://localhost:3000
```

You'll see the beautiful Task Manager interface! 🎉

## 🌐 Using the Web UI

### Features

1. **Dashboard** - View statistics (Total, Pending, Completed tasks)
2. **Add Tasks** - Click "Add New Task" button
3. **Markdown Support** - Use formatting like:
   - `**bold**`, `*italic*`
   - Lists, code blocks, quotes
   - Links, tables, and more!
4. **Filter** - Quick filter tabs for different task statuses
5. **Edit** - Click pencil icon on any task
6. **Delete** - Click trash icon (with confirmation)

### Markdown Example

When creating a task, you can format the description:

```markdown
**Important:** Complete by Friday

- Research API design
- Implement `authentication`
- _Review_ documentation

> Don't forget to test!
```

## 📚 API Endpoints

### Base URL

```
http://localhost:3000/api/tasks
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

See [CRUD_EXAMPLES.md](./CRUD_EXAMPLES.md) for detailed API examples including:

- PowerShell commands
- cURL commands
- Complete test scripts
- Postman setup

### Quick Example - Create a Task

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Build authentication system",
    "description": "Implement JWT-based authentication",
    "status": "pending",
    "dueDate": "2026-02-10"
  }'
```

## 📊 Task Schema

| Field       | Type   | Required | Default   | Description                                         |
| ----------- | ------ | -------- | --------- | --------------------------------------------------- |
| title       | String | Yes      | -         | Task title                                          |
| description | String | Yes      | -         | Task description (supports markdown)                |
| status      | String | No       | `pending` | Task status (`pending`, `in-progress`, `completed`) |
| dueDate     | Date   | No       | -         | Task due date                                       |
| createdAt   | Date   | Auto     | -         | Creation timestamp                                  |
| updatedAt   | Date   | Auto     | -         | Last update timestamp                               |

## 🎨 Screenshots

### Dashboard

![Modern UI with gradient design and statistics](screenshot-placeholder)

### Task Management

![Task cards with markdown rendering](screenshot-placeholder)

## 🐛 Error Handling

The API returns appropriate HTTP status codes:

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

## 🔒 Security Features

- ✅ XSS protection with DOMPurify
- ✅ MongoDB injection prevention (Mongoose)
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variables for sensitive data

### Production Recommendations

For production deployment, consider adding:

- Authentication (JWT, OAuth)
- Rate limiting (express-rate-limit)
- Helmet.js for security headers
- Input sanitization middleware
- HTTPS/SSL certificates
- Database backups
- Error monitoring (Sentry, LogRocket)

## 🚀 Deployment

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Add MongoDB Atlas addon or use existing cluster
heroku addons:create mongolab

# Deploy
git push heroku main
```

### Deploy to Vercel/Netlify

The frontend can be deployed separately to static hosting, with the API hosted on platforms like:

- Heroku
- Railway
- Render
- DigitalOcean
- AWS

## 🧪 Testing

### Manual Testing

1. Use the web UI at `http://localhost:3000`
2. Use Postman or cURL (see CRUD_EXAMPLES.md)
3. Test all CRUD operations

### Future Enhancements

- [ ] Unit tests (Jest/Mocha)
- [ ] Integration tests
- [ ] API documentation (Swagger)
- [ ] User authentication
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Real-time updates (WebSockets)

## 📝 License

ISC

## 👨‍💻 Author

**Echo-Scaler**

- GitHub: [@Echo-Scaler](https://github.com/Echo-Scaler)
- Repository: [node-express-API](https://github.com/Echo-Scaler/node-express-API)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Built with ❤️ using Node.js, Express, and MongoDB**

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
