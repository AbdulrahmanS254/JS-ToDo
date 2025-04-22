const form = document.getElementById("add-form");
const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const tasksBox = document.getElementById("task-container");
const close = document.getElementsByClassName("close-btn");
const taskItem = document.getElementsByClassName("task-item");

let taskArr = [];

form.addEventListener("submit", (ev) => {
    // making sure the input is not empty
    if (inputBox.value === "") {
        inputBox.classList.add("wrong-input");
        inputBox.addEventListener("animationend", () => {
            inputBox.classList.remove("wrong-input");
        });
    } else {
        let task = document.createElement("li");
        task.classList.add("task-item");
        let del = document.createElement("span");
        del.innerHTML = "\u00d7";
        del.classList.add("del-btn");
        task.innerText = inputBox.value;
        task.appendChild(del);
        tasksBox.appendChild(task);
    }
    inputBox.value = "";
    ev.preventDefault();
    saveData();
});

tasksBox.addEventListener(
    "click",
    (e) => {
        if (e.target.classList.contains("task-item")) {
            e.target.classList.toggle("checked");
            saveData();
            return;
        }
        if (e.target.className === "del-btn") {
            e.target.parentElement.remove();
            saveData();
            return;
        }
    },
    false
);

const saveData = () => {
    localStorage.setItem("data", tasksBox.innerHTML);
};

const getData = () => {
    tasksBox.innerHTML = localStorage.getItem("data");
};

getData();
