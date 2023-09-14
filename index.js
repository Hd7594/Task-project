// Projet classique que chatGPT m'a suggéré de réaliser

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const taskRoutes = require("./routes/task");
app.use(taskRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server started");
});

//DEPOT GITHUB
