const { z } = require("zod");

const ALLOWED_STATUSES = ["pending", "completed"];

const taskStatusSchema = z
  .string()
  .trim()
  .toLowerCase()
  .refine((value) => ALLOWED_STATUSES.includes(value), {
    message: "Status must be either pending or completed",
  });

const createTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().optional(),
    status: taskStatusSchema.optional(),
  })
  .strict();

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1, "Title cannot be empty").optional(),
    description: z.string().trim().optional(),
    status: taskStatusSchema.optional(),
  })
  .strict()
  .refine((payload) => Object.keys(payload).length > 0, {
    message: "At least one field is required for update",
  });

const taskIdSchema = z
  .string()
  .trim()
  .regex(/^[1-9]\d*$/, "Task id must be a positive integer")
  .transform((value) => Number(value));

const filterTasksSchema = z
  .object({
    status: taskStatusSchema.optional(),
  })
  .strict();

module.exports = {
  validateCreateTask: (payload) => createTaskSchema.parse(payload),
  validateUpdateTask: (payload) => updateTaskSchema.parse(payload),
  validateTaskId: (idParam) => taskIdSchema.parse(idParam),
  validateTaskFilters: (query) => filterTasksSchema.parse(query),
};
