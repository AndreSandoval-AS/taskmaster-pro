const taskRepository = require("../repositories/task.repository");
const ApiError = require("../utils/apiError");
const {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId,
  validateTaskFilters,
} = require("../validations/task.validation");

class TaskService {
  async createTask(payload) {
    const validatedPayload = validateCreateTask(payload);
    return taskRepository.create(validatedPayload);
  }

  async listTasks(query) {
    const validatedQuery = validateTaskFilters(query);
    const filters = validatedQuery.status ? { status: validatedQuery.status } : {};
    return taskRepository.findMany(filters);
  }

  async getTaskById(idParam) {
    const id = validateTaskId(idParam);
    return this.getTaskByIdOrFail(id);
  }

  async updateTask(idParam, payload) {
    const id = validateTaskId(idParam);
    const validatedPayload = validateUpdateTask(payload);

    await this.getTaskByIdOrFail(id);
    return taskRepository.updateById(id, validatedPayload);
  }

  async deleteTask(idParam) {
    const id = validateTaskId(idParam);
    await this.getTaskByIdOrFail(id);
    await taskRepository.deleteById(id);
  }

  async getTaskByIdOrFail(id) {
    const task = await taskRepository.findById(id);
    if (!task) {
      throw new ApiError(404, "Task not found");
    }
    return task;
  }
}

module.exports = new TaskService();
