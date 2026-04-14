const { z } = require("zod");

const taskStatusEnum = z.enum(["pending", "completed"]);

const createTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional(),
    status: taskStatusEnum.optional(),
  })
  .strict();

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title cannot be empty").optional(),
    description: z.string().trim().optional(),
    status: taskStatusEnum.optional(),
  })
  .strict()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update",
  });

const taskIdSchema = z.coerce.number().int().positive();

const filterTasksSchema = z
  .object({
    status: taskStatusEnum.optional(),
  })
  .strict();

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  filterTasksSchema,
};
