const form = document.getElementById("add-form");
const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const tasksBox = document.getElementById("task-container");

form.addEventListener("submit", (ev) => {
    if (inputBox.value === "") {
        inputBox.classList.add("wrong-input");
        inputBox.addEventListener("animationend", () => {
            inputBox.classList.remove("wrong-input");
        });
    } else {
        let task = document.createElement('li');
        task.innerText = inputBox.value;
        tasksBox.appendChild(task);
    }
    ev.preventDefault();
});
