const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(`${__dirname}/../public`));

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar');
var rollbar = new Rollbar({
    accessToken: '27d44a2eb1cb48959dd414df57fdcd31',
    captureUncaught: true,
    captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log('It\'s working!');

const { getCompliment, getFortune, addTask, updateTask, deleteTask, getStudents } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get('/api/students', getStudents);
app.post("/api/task", addTask);
app.put("/api/task/:id", updateTask);
app.delete("/api/task/:id", deleteTask);

app.listen(4000, () => console.log("Server running on 4000"));
