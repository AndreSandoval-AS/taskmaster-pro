const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class TaskRepository {
  async create(data) {
    return prisma.task.create({ data });
  }

  async findMany(filters) {
    return prisma.task.findMany({
      where: filters,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id) {
    return prisma.task.findUnique({ where: { id } });
  }

  async updateById(id, data) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteById(id) {
    return prisma.task.delete({ where: { id } });
  }
}

module.exports = new TaskRepository();
