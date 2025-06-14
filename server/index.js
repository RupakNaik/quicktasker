const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

//connect to MongoDB
mongoose.connect(
    "mongodb://localhost:27017/quicktasker",
);

//define the task schema
const Task = mongoose.model("Task", {
    title: String,
    completed: Boolean
});

//get all tasks
app.get("/tasks", async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

//post anew task
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

//start the server
app.listen(5000, () => {
    console.log("Server started on port 5000");
});