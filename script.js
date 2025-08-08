function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `${taskText} <button class="delete-btn" onclick="deleteTask(this)">✖</button>`;
  document.getElementById("taskList").appendChild(li);

  input.value = "";
}

function deleteTask(button) {
  const li = button.parentElement;
  li.classList.add("fade-out");
  li.addEventListener("transitionend", () => li.remove());
}
