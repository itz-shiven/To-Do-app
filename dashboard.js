// ================= GUARD CHECK =================
const isLoggedIn = localStorage.getItem("loggedIn");

if (isLoggedIn !== "true") {
    window.location.href = "index.html";
}


// ================= CURRENT USER =================
const currentUserEmail = localStorage.getItem("currentUser");
const taskKey = "tasks_" + currentUserEmail;


// ================= DOM ELEMENTS =================
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const greetingBar = document.getElementById("greetingBar");
const logoutBtn = document.getElementById("logoutBtn");


// ================= LOAD TASKS ON START =================
loadTasks();


// ================= ADD TASK =================
addTaskBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();
    if (task === "") return;

    let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

    tasks.push(task);

    localStorage.setItem(taskKey, JSON.stringify(tasks));

    taskInput.value = "";
    loadTasks();
});


// ================= GREETING SYSTEM =================
const users = JSON.parse(localStorage.getItem("users")) || [];

const currentUserData = users.find(user => user.email === currentUserEmail);

// time detect
const hour = new Date().getHours();
let greetingText = "";

if (hour < 12) {
    greetingText = "Good Morning";
}
else if (hour < 17) {
    greetingText = "Good Afternoon";
}
else if (hour < 21) {
    greetingText = "Good Evening";
}
else {
    greetingText = "Good Night";
}

// show greeting
if (greetingBar) {
    if (currentUserData) {
        greetingBar.textContent =
            `${greetingText}, ${currentUserData.name} `;
    } else {
        greetingBar.textContent =
            `${greetingText}, User `;
    }
}


// ================= LOAD TASKS FUNCTION =================
function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-text">${index + 1}. ${task}</div>

            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        li.querySelector(".delete-btn").onclick = () => deleteTask(index);
        li.querySelector(".edit-btn").onclick = () => editTask(index);

        taskList.appendChild(li);
    });
}


// ================= DELETE TASK =================
function deleteTask(index) {

    let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

    tasks.splice(index, 1);

    localStorage.setItem(taskKey, JSON.stringify(tasks));

    loadTasks();
}


// ================= EDIT TASK =================
function editTask(index) {

    let tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

    const newTask = prompt("Edit your task:", tasks[index]);

    if (newTask === null || newTask.trim() === "") return;

    tasks[index] = newTask.trim();

    localStorage.setItem(taskKey, JSON.stringify(tasks));

    loadTasks();
}


// ================= LOGOUT =================
if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("currentUser");

        window.location.href = "index.html";
    });
}