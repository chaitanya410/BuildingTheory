const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/projectControllers");

// Route to add a new project
router.post("/addProject", projectController.addProject);

// Route to get a list of all projects
router.get("/getProjects", projectController.getProjects);

// Route to update a project by ID
router.post("/updateProject/:projectId", projectController.updateProject);

module.exports = router;
