const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const addTaskForm = document.getElementById("task-form");
const tableBody = document.getElementById("table-body");

const getCompliment = () => {
    axios.get("/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("/api/fortune/").then(res => {
            const data = res.data;
            alert(data);
    });
};

const updateTask = e => {
    const taskID = e.target.parentNode.parentNode.id;
    const type = e.target.getAttribute("type");

    axios.put(`/api/task/${taskID}`, {type}).then(res => {
        displayTasks(res.data);
    });
};

const deleteTask = e => {
    const taskRow = e.target.parentNode.parentNode;

    axios.delete(`/api/task/${taskRow.id}`).then(() => {
        taskRow.remove();
    });
};

const addTask = (e) => {
    e.preventDefault();

    const taskNameInput = document.getElementById("task-name");
    const taskDescriptionInput = document.getElementById("task-description");
    const taskPriorityInput = document.getElementById("task-priority");

    const task = {
        name: taskNameInput.value,
        description: taskDescriptionInput.value,
        priority: taskPriorityInput.value
    }

    axios.post("/api/task", task).then(res => {
        displayTasks(res.data);
        taskNameInput.value = "";
        taskDescriptionInput.value = "";
        taskPriorityInput.value = 1;
    });
};

const displayTasks = tasks => {
    tableBody.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        showTask(tasks[i]);
    }
};

const showTask = task => {
    const taskRow = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdDescription = document.createElement("td");
    const tdPriority = document.createElement("td");
    const tdDelete = document.createElement("td");
    const minusBtn = document.createElement("button");
    const plusBtn = document.createElement("button");
    const prioritySpan = document.createElement("span");
    const deleteBtn = document.createElement("button");

    taskRow.id = task.id;
    tdName.innerHTML = task.name;
    tdDescription.innerHTML = task.description;
    prioritySpan.innerHTML = task.priority;
    minusBtn.innerHTML = "-";
    plusBtn.innerHTML = "+";
    deleteBtn.innerHTML = "Delete";

    minusBtn.addEventListener("click", updateTask);
    plusBtn.addEventListener("click", updateTask);
    deleteBtn.addEventListener("click", deleteTask);

    minusBtn.setAttribute("type", "minus");
    plusBtn.setAttribute("type", "plus");

    tdPriority.appendChild(minusBtn);
    tdPriority.appendChild(prioritySpan);
    tdPriority.appendChild(plusBtn);

    tdDelete.appendChild(deleteBtn);
    
    taskRow.append(tdName, tdDescription, tdPriority, tdDelete);

    // taskRow.innerHTML = `
    //     <td>${task.name}</td>
    //     <td>${task.description}</td>
    //     <td>
    //         <button onclick="updateTask(${task.id}, 'minus')">-</button>
    //         ${task.priority}
    //         <button onclick="updateTask(${task.id}, 'plus')">+</button>
    //     </td>
    //     <td>
    //         <button onclick="deleteTask(${task.id})">Delete</button>
    //     </td>`;

    tableBody.appendChild(taskRow);
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
addTaskForm.addEventListener('submit', addTask);