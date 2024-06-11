const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/register", authController.createUser);
authRouter.post("/login", authController.loginUser);

module.exports = authRouter;