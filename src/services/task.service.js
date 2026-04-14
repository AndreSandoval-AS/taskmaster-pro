const taskRepository = require("../repositories/task.repository");
const ApiError = require("../utils/apiError");
const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  filterTasksSchema,
} = require("../validations/task.validation");

class TaskService {
  async createTask(payload) {
    const validatedPayload = createTaskSchema.parse(payload);
    return taskRepository.createTask(validatedPayload);
  }

  async getTasks(query) {
    const validatedQuery = filterTasksSchema.parse(query);
    const filters = validatedQuery.status ? { status: validatedQuery.status } : {};
    return taskRepository.getTasks(filters);
  }

  async getTaskById(idParam) {
    const id = taskIdSchema.parse(idParam);
    const task = await taskRepository.getTaskById(id);

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    return task;
  }

  async updateTask(idParam, payload) {
    const id = taskIdSchema.parse(idParam);
    const validatedPayload = updateTaskSchema.parse(payload);

    await this.getTaskById(id);
    return taskRepository.updateTask(id, validatedPayload);
  }

  async deleteTask(idParam) {
    const id = taskIdSchema.parse(idParam);
    await this.getTaskById(id);
    await taskRepository.deleteTask(id);
  }
}

module.exports = new TaskService();
