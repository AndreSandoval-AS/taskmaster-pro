const taskService = require("../services/task.service");

async function createTask(req, res) {
  const task = await taskService.createTask(req.body);
  return res.status(201).json({ success: true, data: task });
}

async function getTasks(req, res) {
  const tasks = await taskService.listTasks(req.query);
  return res.status(200).json({ success: true, data: tasks });
}

async function getTaskById(req, res) {
  const task = await taskService.getTaskById(req.params.id);
  return res.status(200).json({ success: true, data: task });
}

async function updateTask(req, res) {
  const task = await taskService.updateTask(req.params.id, req.body);
  return res.status(200).json({ success: true, data: task });
}

async function deleteTask(req, res) {
  await taskService.deleteTask(req.params.id);
  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
