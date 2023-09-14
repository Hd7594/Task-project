const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

router.post("/tasks/create", async (req, res) => {
  try {
    const { name, description } = req.body;
    const newTask = new Task({
      name: name,
      description: description,
      date: new Date(),
    });
    await newTask.save();
    res.json(newTask);
    //console.log(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/tasks/all", async (req, res) => {
  try {
    const listTasks = await Task.find();
    if (listTasks !== null) {
      res.json(listTasks);
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/tasks/", async (req, res) => {
  try {
    const idTask = await Task.findById(req.query.id);
    if (!req.query.id) {
      res.json({ message: "error" });
    } else {
      res.json(idTask);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/tasks/update", async (req, res) => {
  try {
    if (!req.body.id) {
      res.json({ message: "request not found" });
    } else {
      const updateTask = await Task.findByIdAndUpdate(req.body.id, {
        description: req.body.description,
      });

      await updateTask.save();
      res.json({ message: "task updated" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/tasks/delete", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.body.id);
    if (deletedTask) {
      res.json({ message: "task deleted" });
    } else {
      res.json({ message: "delete task not founded " });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
