const express = require("express");
const taskController = require("../controllers/task.controller");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post("/", asyncHandler(taskController.createTask));
router.get("/", asyncHandler(taskController.getTasks));
router.get("/:id", asyncHandler(taskController.getTaskById));
router.put("/:id", asyncHandler(taskController.updateTask));
router.delete("/:id", asyncHandler(taskController.deleteTask));

module.exports = router;
