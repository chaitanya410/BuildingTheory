const express = require("express");
const router = express.Router();
const taskController = require("../Controllers/taskControllers");

router.get("/getTasks", taskController.getTasks);

router.post("/addTasks", taskController.addTask);

router.post("/updateTasks/:task_id", taskController.updateTask);

router.delete("/deleteTasks/:task_id", taskController.deleteTask);

module.exports = router;