const express = require("express");
const taskRoutes = require("./routes/task.routes");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "TaskMaster Pro API is healthy" });
});

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

module.exports = app;
