const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
});

app.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

//connect to MongoDB
mongoose.connect("mongodb://localhost:27017/quicktasker");

//define the task schema
const Task = mongoose.model("Task", {
    title: String,
    completed: Boolean,
});

//get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

//post anew task
app.post("/tasks", async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
});

//start the server
app.listen(8080, () => {
    console.log("Server started on port 8080");
});