# Sample CRUD Operations for Task API

This file contains example data and curl commands to test all CRUD operations.

## Base URL

```
http://localhost:3000
```

## Sample Data

### Task 1 - Pending Task

```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive API documentation and update README file",
  "status": "pending",
  "dueDate": "2026-02-10"
}
```

### Task 2 - In Progress Task

```json
{
  "title": "Build authentication system",
  "description": "Implement JWT-based authentication with user registration and login",
  "status": "in-progress",
  "dueDate": "2026-02-15"
}
```

### Task 3 - Completed Task

```json
{
  "title": "Setup development environment",
  "description": "Install Node.js, MongoDB, and configure project dependencies",
  "status": "completed",
  "dueDate": "2026-02-01"
}
```

---

## CRUD Operation Examples

### 1. CREATE - Add New Task (POST)

**Command:**

```bash
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{\"title\":\"Complete project documentation\",\"description\":\"Write comprehensive API documentation and update README file\",\"status\":\"pending\",\"dueDate\":\"2026-02-10\"}"
```

**PowerShell Command:**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method POST -ContentType "application/json" -Body '{"title":"Complete project documentation","description":"Write comprehensive API documentation and update README file","status":"pending","dueDate":"2026-02-10"}'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation and update README file",
    "status": "pending",
    "dueDate": "2026-02-10T00:00:00.000Z",
    "createdAt": "2026-02-05T06:09:46.000Z",
    "updatedAt": "2026-02-05T06:09:46.000Z"
  }
}
```

---

### 2. READ - Get All Tasks (GET)

**Command:**

```bash
curl http://localhost:3000/api/tasks
```

**PowerShell Command:**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method GET
```

**Expected Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "Complete project documentation",
      "description": "Write comprehensive API documentation and update README file",
      "status": "pending",
      "dueDate": "2026-02-10T00:00:00.000Z",
      "createdAt": "2026-02-05T06:09:46.000Z",
      "updatedAt": "2026-02-05T06:09:46.000Z"
    }
    // ... more tasks
  ]
}
```

---

### 3. READ - Get Single Task by ID (GET)

**Command:**

```bash
curl http://localhost:3000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1
```

**PowerShell Command:**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1" -Method GET
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation and update README file",
    "status": "pending",
    "dueDate": "2026-02-10T00:00:00.000Z",
    "createdAt": "2026-02-05T06:09:46.000Z",
    "updatedAt": "2026-02-05T06:09:46.000Z"
  }
}
```

---

### 4. UPDATE - Update Task Status (PUT)

**Command:**

```bash
curl -X PUT http://localhost:3000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1 -H "Content-Type: application/json" -d "{\"status\":\"in-progress\"}"
```

**PowerShell Command:**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1" -Method PUT -ContentType "application/json" -Body '{"status":"in-progress"}'
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Complete project documentation",
    "description": "Write comprehensive API documentation and update README file",
    "status": "in-progress",
    "dueDate": "2026-02-10T00:00:00.000Z",
    "createdAt": "2026-02-05T06:09:46.000Z",
    "updatedAt": "2026-02-05T06:15:30.000Z"
  }
}
```

---

### 5. DELETE - Remove Task (DELETE)

**Command:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1
```

**PowerShell Command:**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/65a1b2c3d4e5f6g7h8i9j0k1" -Method DELETE
```

**Expected Response:**

```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {}
}
```

---

## Quick Test Script (PowerShell)

Save this as `test-api.ps1` and run it to test all operations:

```powershell
# Test API Base URL
$baseUrl = "http://localhost:3000/api/tasks"

Write-Host "Testing Task API CRUD Operations..." -ForegroundColor Cyan

# 1. CREATE
Write-Host "`n1. Creating new task..." -ForegroundColor Green
$newTask = @{
    title = "Test Task from PowerShell"
    description = "This is a test task created via PowerShell script"
    status = "pending"
    dueDate = "2026-02-20"
} | ConvertTo-Json

$created = Invoke-RestMethod -Uri $baseUrl -Method POST -ContentType "application/json" -Body $newTask
$taskId = $created.data._id
Write-Host "Created Task ID: $taskId"

# 2. READ ALL
Write-Host "`n2. Getting all tasks..." -ForegroundColor Green
$allTasks = Invoke-RestMethod -Uri $baseUrl -Method GET
Write-Host "Total Tasks: $($allTasks.count)"

# 3. READ ONE
Write-Host "`n3. Getting single task..." -ForegroundColor Green
$singleTask = Invoke-RestMethod -Uri "$baseUrl/$taskId" -Method GET
Write-Host "Task Title: $($singleTask.data.title)"

# 4. UPDATE
Write-Host "`n4. Updating task status..." -ForegroundColor Green
$updateData = @{
    status = "completed"
} | ConvertTo-Json

$updated = Invoke-RestMethod -Uri "$baseUrl/$taskId" -Method PUT -ContentType "application/json" -Body $updateData
Write-Host "Updated Status: $($updated.data.status)"

# 5. DELETE
Write-Host "`n5. Deleting task..." -ForegroundColor Green
$deleted = Invoke-RestMethod -Uri "$baseUrl/$taskId" -Method DELETE
Write-Host "Deleted: $($deleted.message)"

Write-Host "`nAll CRUD operations completed successfully!" -ForegroundColor Cyan
```

---

## Testing with Postman

### Import this collection:

1. Open Postman
2. Click "Import"
3. Create new requests for each operation:

**Collection: Task Management API**

| Name           | Method | URL                                   | Body (JSON)               |
| -------------- | ------ | ------------------------------------- | ------------------------- |
| Get All Tasks  | GET    | `http://localhost:3000/api/tasks`     | -                         |
| Get Task by ID | GET    | `http://localhost:3000/api/tasks/:id` | -                         |
| Create Task    | POST   | `http://localhost:3000/api/tasks`     | See sample data above     |
| Update Task    | PUT    | `http://localhost:3000/api/tasks/:id` | `{"status": "completed"}` |
| Delete Task    | DELETE | `http://localhost:3000/api/tasks/:id` | -                         |

---

## Error Scenarios

### Task Not Found (404)

```bash
curl http://localhost:3000/api/tasks/000000000000000000000000
```

**Response:**

```json
{
  "success": false,
  "message": "Task not found"
}
```

### Invalid Data (400)

```bash
curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d "{}"
```

**Response:**

```json
{
  "success": false,
  "message": "Task validation failed: title: Please add a title, description: Please add a description"
}
```

---

## MongoDB Requirement

⚠️ **Important:** These operations will only work after MongoDB is set up and running.

See the README for MongoDB setup instructions (local installation or MongoDB Atlas).
