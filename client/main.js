const complimentBtn = document.getElementById("complimentButton");
const fortuneBtn = document.getElementById("fortuneButton");
const addTaskForm = document.getElementById("task-form");
const tableBody = document.getElementById("table-body");

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/").then(res => {
            const data = res.data;
            alert(data);
    });
};

const updateTask = e => {
    if (e.target.innerHTML === "-") {
        console.log("minus");
    } else if (e.target.innerHTML === "+") {
        console.log("plus");
    }
};

const deleteTask = e => {

};

const addTask = (e) => {
    e.preventDefault();

    const taskName = document.getElementById("task-name");
    const taskDescription = document.getElementById("task-description");
    const taskPriority = document.getElementById("task-priority");

    const task = {
        name: taskName.value,
        description: taskDescription.value,
        priority: taskPriority.value
    }

    axios.post("http://localhost:4000/api/task", task).then(res => {
        displayTasks(res.data);
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


    tdPriority.appendChild(minusBtn);
    tdPriority.appendChild(prioritySpan);
    tdPriority.appendChild(plusBtn);

    tdDelete.appendChild(deleteBtn);
    // tdPriority.innerHTML = `<button onclick"updateTask(${task.id}, 'minus')">-</button>
    //     ${task.priority}
    //     <button onclick="updateTask(${task.id}, 'plus')">+</button>`;

    // tdDelete.appendChild(deleteBtn);
    // tdDelete.innerHTML = `<button onclick"deleteTask(${task.id})">Delete</button>`;
    
    taskRow.append(tdName, tdDescription, tdPriority, tdDelete);

    // const text = `
    // <td>${task.name}</td>
    // <td>${task.description}</td>
    // <td>
    //     <button onclick"updateTask(${task.id}, 'minus')">-</button>
    //     ${task.priority}
    //     <button onclick="updateTask(${task.id}, 'plus')">+</button>
    // </td>
    // <td>
    //     <button onclick"deleteTask(${task.id})">Delete</button>
    // </td>`;
    // taskRow.innerHTML = text;

    // taskRow.innerHTML = `
    //     <td>${task.name}</td>
    //     <td>${task.description}</td>
    //     <td>
    //         <button onclick"updateTask(${task.id}, 'minus')">-</button>
    //         ${task.priority}
    //         <button onclick="updateTask(${task.id}, 'plus')">+</button>
    //     </td>
    //     <td>
    //         <button onclick"deleteTask(${task.id})">Delete</button>
    //     </td>`;
        // console.log(taskRow);

    tableBody.appendChild(taskRow);
};

complimentBtn.addEventListener('click', getCompliment);
fortuneBtn.addEventListener('click', getFortune);
addTaskForm.addEventListener('submit', addTask);