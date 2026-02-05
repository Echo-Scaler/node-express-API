// API Base URL
const API_BASE_URL = "http://localhost:3000/api/tasks";

// Global state
let allTasks = [];
let currentFilter = "all";

// DOM Elements
const tasksContainer = document.getElementById("tasksContainer");
const loading = document.getElementById("loading");
const emptyState = document.getElementById("emptyState");
const addTaskForm = document.getElementById("addTaskForm");
const editTaskForm = document.getElementById("editTaskForm");
const taskFormContainer = document.getElementById("taskForm");
const toggleFormBtn = document.getElementById("toggleFormBtn");
const cancelFormBtn = document.getElementById("cancelFormBtn");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("closeModal");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const filterTabs = document.querySelectorAll(".tab-btn");

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
  // Toggle add task form
  toggleFormBtn.addEventListener("click", () => {
    taskFormContainer.style.display = "block";
    taskFormContainer.scrollIntoView({ behavior: "smooth" });
  });

  cancelFormBtn.addEventListener("click", () => {
    taskFormContainer.style.display = "none";
    addTaskForm.reset();
  });

  // Add task form submit
  addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createTask();
  });

  // Edit task form submit
  editTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await updateTask();
  });

  // Close modal
  closeModal.addEventListener("click", closeEditModal);
  cancelEditBtn.addEventListener("click", closeEditModal);

  editModal.addEventListener("click", (e) => {
    if (e.target === editModal) {
      closeEditModal();
    }
  });

  // Filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      renderTasks();
    });
  });
}

// API Functions
async function loadTasks() {
  try {
    showLoading();
    const response = await fetch(API_BASE_URL);
    const data = await response.json();

    if (data.success) {
      allTasks = data.data;
      renderTasks();
      updateStats();
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
    showError("Failed to load tasks. Make sure the API server is running.");
  } finally {
    hideLoading();
  }
}

async function createTask() {
  const formData = new FormData(addTaskForm);
  const taskData = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate") || undefined,
  };

  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (data.success) {
      addTaskForm.reset();
      taskFormContainer.style.display = "none";
      await loadTasks();
      showSuccess("Task created successfully!");
    } else {
      showError(data.message || "Failed to create task");
    }
  } catch (error) {
    console.error("Error creating task:", error);
    showError("Failed to create task. Please try again.");
  }
}

async function updateTask() {
  const taskId = document.getElementById("editTaskId").value;
  const formData = new FormData(editTaskForm);
  const taskData = {
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
    dueDate: formData.get("dueDate") || undefined,
  };

  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (data.success) {
      closeEditModal();
      await loadTasks();
      showSuccess("Task updated successfully!");
    } else {
      showError(data.message || "Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
    showError("Failed to update task. Please try again.");
  }
}

async function deleteTask(taskId, taskTitle) {
  if (!confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (data.success) {
      await loadTasks();
      showSuccess("Task deleted successfully!");
    } else {
      showError(data.message || "Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    showError("Failed to delete task. Please try again.");
  }
}

// UI Functions
function renderTasks() {
  const filteredTasks =
    currentFilter === "all"
      ? allTasks
      : allTasks.filter((task) => task.status === currentFilter);

  if (filteredTasks.length === 0) {
    showEmptyState();
    return;
  }

  hideEmptyState();

  tasksContainer.innerHTML = filteredTasks
    .map(
      (task) => `
        <div class="task-card status-${task.status}" data-task-id="${task._id}">
            <div class="task-header">
                <div>
                    <h3 class="task-title">${escapeHtml(task.title)}</h3>
                    <div class="task-meta">
                        <span class="status-badge ${task.status}">${formatStatus(task.status)}</span>
                        ${
                          task.dueDate
                            ? `
                            <span class="due-date">
                                📅 ${formatDate(task.dueDate)}
                            </span>
                        `
                            : ""
                        }
                    </div>
                </div>
                <div class="task-actions">
                    <button class="icon-btn edit" onclick="openEditModal('${task._id}')" title="Edit">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="icon-btn delete" onclick="deleteTask('${task._id}', '${escapeHtml(task.title)}')" title="Delete">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="task-description markdown-content">${renderMarkdown(task.description)}</div>
            <div class="task-footer">
                <small style="color: var(--gray-400)">Created: ${formatDateTime(task.createdAt)}</small>
            </div>
        </div>
    `,
    )
    .join("");
}

// Render markdown safely
function renderMarkdown(text) {
  if (!text) return "";
  // Parse markdown using marked.js
  const rawHtml = marked.parse(text);
  // Sanitize with DOMPurify to prevent XSS
  return DOMPurify.sanitize(rawHtml);
}

function openEditModal(taskId) {
  const task = allTasks.find((t) => t._id === taskId);
  if (!task) return;

  document.getElementById("editTaskId").value = task._id;
  document.getElementById("editTitle").value = task.title;
  document.getElementById("editDescription").value = task.description;
  document.getElementById("editStatus").value = task.status;
  document.getElementById("editDueDate").value = task.dueDate
    ? task.dueDate.split("T")[0]
    : "";

  editModal.classList.add("active");
}

function closeEditModal() {
  editModal.classList.remove("active");
  editTaskForm.reset();
}

function updateStats() {
  const total = allTasks.length;
  const pending = allTasks.filter((t) => t.status === "pending").length;
  const inProgress = allTasks.filter((t) => t.status === "in-progress").length;
  const completed = allTasks.filter((t) => t.status === "completed").length;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("pendingTasks").textContent = pending + inProgress;
  document.getElementById("completedTasks").textContent = completed;
}

function showLoading() {
  loading.style.display = "block";
  emptyState.style.display = "none";
}

function hideLoading() {
  loading.style.display = "none";
}

function showEmptyState() {
  emptyState.style.display = "block";
  tasksContainer.innerHTML = "";
}

function hideEmptyState() {
  emptyState.style.display = "none";
}

function showSuccess(message) {
  alert("✅ " + message);
}

function showError(message) {
  alert("❌ " + message);
}

// Utility Functions
function formatStatus(status) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
