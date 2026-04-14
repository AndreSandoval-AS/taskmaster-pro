const express = require("express");
const taskController = require("../controllers/task.controller");

const router = express.Router();

router.post("/", (req, res, next) => taskController.createTask(req, res, next));
router.get("/", (req, res, next) => taskController.getTasks(req, res, next));
router.get("/:id", (req, res, next) => taskController.getTaskById(req, res, next));
router.put("/:id", (req, res, next) => taskController.updateTask(req, res, next));
router.delete("/:id", (req, res, next) => taskController.deleteTask(req, res, next));

module.exports = router;
