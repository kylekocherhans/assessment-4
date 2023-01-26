let tasks = [];
let globalID = 1;

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
    accessToken: '27d44a2eb1cb48959dd414df57fdcd31',
    captureUncaught: true,
    captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log('It\'s working!');

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["Your love life will be happy and harmonious.", "Your mind is your greatest asset.", "Your moods signal a period of change.", "Your quick wits will get you out of a tough situation.", "Your talents will be recognized and suitably rewarded."];
      
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },

    addTask: (req, res) => {
        const {name, description, priority} = req.body;

        const newTask = {
            id: globalID,
            name,
            description,
            priority: +priority
        }

        globalID++;

        tasks.push(newTask);

        console.log("Task Added");
        console.log(tasks);

        res.status(200).send(tasks);
    },

    updateTask: (req, res) => {
        const {id} = req.params;
        const {type} = req.body;
        const getID = task => task.id === +id;
        const index = tasks.findIndex(getID);

        if (index !== -1) {
            if (type === "plus") {
                if (tasks[index].priority < 4) {
                    tasks[index].priority++;
                }
            } else if (type === "minus") {
                if (tasks[index].priority > 1) {
                    tasks[index].priority--;
                }
            }
            console.log("Task Updated");
            console.log(tasks[index]);
            res.status(200).send(tasks);
        } else {
            res.status(404).send("Couldn't find a task with that id");
        }
    },

    deleteTask: (req, res) => {
        const {id} = req.params;
        const getID = task => task.id === +id;
        const index = tasks.findIndex(getID);

        if (index !== -1) {
            tasks.splice(index, 1);
            console.log("Task Deleted");
            console.log(tasks);
        } else {
            res.status(404).send("Couldn't find a task with that id");
        }

        res.status(200).send(tasks);
    },

    getStudents: (req, res) => {
        try {
            rollbar.info(`Calling function that doesn't exist.`);
            functionThatDoesntExist();
        } catch (err) {
            console.log(err)
            rollbar.error(err);
        }
        
    }
};
