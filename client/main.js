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
    const taskID = e.target.parentNode.parentNode.id;
    const type = e.target.getAttribute("type");

    axios.put(`http://localhost:4000/api/task/${taskID}`, {type}).then(res => {
        displayTasks(res.data);
    });
};

const deleteTask = e => {
    const taskRow = e.target.parentNode.parentNode;

    axios.delete(`http://localhost:4000/api/task/${taskRow.id}`).then(() => {
        taskRow.remove();
    });
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

    minusBtn.setAttribute("type", "minus");
    plusBtn.setAttribute("type", "plus");


    tdPriority.appendChild(minusBtn);
    tdPriority.appendChild(prioritySpan);
    tdPriority.appendChild(plusBtn);

    tdDelete.appendChild(deleteBtn);
    
    taskRow.append(tdName, tdDescription, tdPriority, tdDelete);

    //// THIS WAS ADDING "updatetask" to minus button and "updateTask" to plus button. WHY??????////
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