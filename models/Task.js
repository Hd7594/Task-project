const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  name: String,
  description: String,
  date: Date,
});

module.exports = Task;
