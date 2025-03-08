require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const userService = require("./service/userService");
const taskService = require("./service/taskService");

const { JWTMiddleware } = require("./tokenAuth");
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect("mongodb://localhost:27017/myFirstDb")
  .then((res) => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err, "Error while connecting db");
  });

app.use(express.json());

app.use("/auth", userService);
app.use("/tasks", JWTMiddleware, taskService);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
