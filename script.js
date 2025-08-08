let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

window.onload = function () {
  loadTasks();
  cleanupExpiredTasks();
};

function addTask() {
  const textInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("taskDate");
  const text = textInput.value.trim();
  const date = dateInput.value;

  if (text === "" || date === "") return;

  const task = { text, date };
  tasks.push(task);
  saveTasks();
  renderTask(task);

  textInput.value = "";
  dateInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");

  const deadline = new Date(task.date);
  const readableDate = deadline.toLocaleString();

  li.innerHTML = `
    <div>
      <strong>${task.text}</strong><br/>
      <small>Expires: ${readableDate}</small>
    </div>
    <button class="delete-btn" onclick="deleteTask(this)">✖</button>
  `;

  document.getElementById("taskList").appendChild(li);
}

function deleteTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector("strong").innerText;

  tasks = tasks.filter(t => t.text !== taskText);
  saveTasks();

  li.classList.add("fade-out");
  li.addEventListener("transitionend", () => li.remove());
}

function loadTasks() {
  document.getElementById("taskList").innerHTML = "";
  tasks.forEach(renderTask);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function cleanupExpiredTasks() {
  const now = new Date();
  tasks = tasks.filter(task => new Date(task.date) > now);
  saveTasks();
  loadTasks();
}
