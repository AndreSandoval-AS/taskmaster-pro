const taskService = require("../services/task.service");

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      return res.status(201).json({ success: true, data: task });
    } catch (error) {
      return next(error);
    }
  }

  async getTasks(req, res, next) {
    try {
      const tasks = await taskService.getTasks(req.query);
      return res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      return next(error);
    }
  }

  async getTaskById(req, res, next) {
    try {
      const task = await taskService.getTaskById(req.params.id);
      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      return next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const task = await taskService.updateTask(req.params.id, req.body);
      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      return next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id);
      return res.status(200).json({
        success: true,
        message: "Task deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = new TaskController();
