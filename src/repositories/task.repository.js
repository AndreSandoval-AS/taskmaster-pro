const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class TaskRepository {
  async createTask(data) {
    return prisma.task.create({ data });
  }

  async getTasks(filters) {
    return prisma.task.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });
  }

  async getTaskById(id) {
    return prisma.task.findUnique({ where: { id } });
  }

  async updateTask(id, data) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id) {
    return prisma.task.delete({ where: { id } });
  }
}

module.exports = new TaskRepository();
