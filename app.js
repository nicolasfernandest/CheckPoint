const inputBox = document.getElementById("input-box");
const addButton = document.querySelector(".adicionar");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    const taskList = document.querySelector("#list-container");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add("completed");
        }

        const completeButton = document.createElement("button");
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete");
        completeButton.onclick = () => toggleComplete(index);

        const editButton = document.createElement("button");
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add("edit");
        editButton.onclick = () => editTask(index);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deleteTask(index);

        taskItem.append(completeButton, editButton, deleteButton);
        taskList.appendChild(taskItem);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addButton.addEventListener("click", () => {
    if (inputBox.value.trim() !== "") {
        tasks.push({ text: inputBox.value, completed: false });
        inputBox.value = "";
        renderTasks();
    }
});

function editTask(index) {
    const newText = prompt("Editar tarefa:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

document.addEventListener("DOMContentLoaded", renderTasks);
