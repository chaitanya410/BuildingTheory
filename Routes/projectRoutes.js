const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/projectControllers");

router.post("/addProjects", projectController.addProject);

router.get("/getProjects", projectController.getProjects);

router.post("/updateProjects/:projectId", projectController.updateProject);

module.exports = router;
