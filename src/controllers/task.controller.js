const taskService = require("../services/task.service");
const { sendSuccess } = require("../utils/apiResponse");

async function createTask(req, res) {
  const task = await taskService.createTask(req.body);
  return sendSuccess(res, {
    statusCode: 201,
    message: "Task created successfully",
    data: task,
  });
}

async function getTasks(req, res) {
  const tasks = await taskService.listTasks(req.query);
  return sendSuccess(res, {
    message: "Tasks retrieved successfully",
    data: tasks,
  });
}

async function getTaskById(req, res) {
  const task = await taskService.getTaskById(req.params.id);
  return sendSuccess(res, {
    message: "Task retrieved successfully",
    data: task,
  });
}

async function updateTask(req, res) {
  const task = await taskService.updateTask(req.params.id, req.body);
  return sendSuccess(res, {
    message: "Task updated successfully",
    data: task,
  });
}

async function deleteTask(req, res) {
  await taskService.deleteTask(req.params.id);
  return sendSuccess(res, {
    message: "Task deleted successfully",
    data: null,
  });
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
