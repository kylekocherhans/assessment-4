let tasks = [];
let globalID = 1;

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
        console.log(req.body);

        const {name, description, priority} = req.body;

        const newTask = {
            id: globalID,
            name,
            description,
            priority: +priority
        }

        globalID++;

        tasks.push(newTask);

        res.status(200).send(tasks);
    },

    updateTask: (req, res) => {
        console.log(req.body);

        res.status(200).send(tasks);
    },

    deleteTask: (req, res) => {
        console.log(req.body);

        res.status(200).send(tasks);
    }
};
