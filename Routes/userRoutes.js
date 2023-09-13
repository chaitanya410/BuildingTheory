const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userControllers");

// Route for user registration
// router.post("/registerUsers", userController.registerUser);
router.post("/registerUsers", userController.registerUsers);

// Route for user login
router.post("/loginUsers", userController.loginUser);

// Route for getting a list of all users
router.get("/getUsers", userController.getUsers);

// router.post("/updateUsers/:id",userController.updateUsers);
router.post("/updateUsers/:user_id", userController.updateUser);

module.exports = router;
