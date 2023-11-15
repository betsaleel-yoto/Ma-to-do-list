document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        const task = document.createElement("div");
        task.className = "task";
        task.innerHTML = `
            <span>${taskInput.value}</span>
             <button onclick="removeTask(this)"><i class="fa-solid fa-trash" style="color: #e01b24;"></i></button>
        `;
        taskList.appendChild(task);

        saveTask(taskInput.value);

        taskInput.value = "";
    }
}

function removeTask(button) {
    const taskList = document.getElementById("taskList");
    const task = button.parentNode;
    taskList.removeChild(task);

    // Update local storage after removal
    updateLocalStorage();
}

function clearTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Clear all tasks in local storage
    localStorage.clear();
}

function saveTask(task) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    const taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

function getTasksFromLocalStorage() {
    const tasksString = localStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : [];
}

function updateLocalStorage() {
    const tasks = [];
    const taskElements = document.querySelectorAll(".task span");
    taskElements.forEach(element => tasks.push(element.innerText));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}