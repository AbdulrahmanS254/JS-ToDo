const form = document.getElementById("add-form");
const inputBox = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const tasksBox = document.getElementById("task-container");
const close = document.getElementsByClassName("close-btn");
const taskItem = document.getElementsByClassName("task-item");

window.addEventListener("DOMContentLoaded", () => {
    getData();
});

let tasksData = [];

const dataObjCreate = (inputValue) => {
    let obj = {};
    obj.id = Date.now() + Math.floor(Math.random() * 1000);
    obj.text = inputValue;
    obj.complete = false;
    tasksData.push(obj);
};

const renderTask = () => {
    tasksBox.innerHTML = "";
    tasksData.forEach((el) => {
        let task = document.createElement("li");
        task.classList.add("task-item");
        task.setAttribute("data-id", el.id);
        task.innerText = el.text;

        let del = document.createElement("span");
        del.classList.add("del-btn");
        del.innerHTML = "\u00d7";
        del.setAttribute("data-id", el.id);
        task.appendChild(del);
        tasksBox.appendChild(task);
        if (el.complete === true) {
            task.classList.add("checked");
        }
    });
};

form.addEventListener("submit", (ev) => {
    // making sure the input is not empty
    ev.preventDefault();
    let text = inputBox.value.trim();
    if (text === "") {
        triggerAni();
    } else {
        dataObjCreate(text);
        renderTask();
    }
    // emptying the input
    inputBox.value = "";
    saveData();
});

const triggerAni = () => {
    inputBox.classList.add("wrong-input");
    inputBox.addEventListener("animationend", () => {
        inputBox.classList.remove("wrong-input");
    });
};

tasksBox.addEventListener(
    "click",
    (e) => {
        let target = e.target;
        if (target.classList.contains("task-item")) {
            tasksData = tasksData.map((el) => {
                if (el.id === parseInt(target.dataset.id)) {
                    el.complete = !el.complete;
                }
                return el;
            });
            renderTask();
            saveData();
            return;
        }
        if (target.className === "del-btn") {
            tasksData = tasksData.filter((el) => {
                return el.id !== parseInt(target.dataset.id);
            });
            renderTask();
            saveData();
            return;
        }
    },
    false
);

const saveData = () => {
    localStorage.setItem("data", JSON.stringify(tasksData));
};

const getData = () => {
    tasksData = JSON.parse(localStorage.getItem("data") || []);
    renderTask();
};
