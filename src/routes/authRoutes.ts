import express from "express";
import { AuthController } from "../controllers";
import { validateLogin, validateRegister } from "../middlewares";

export const authRouter = express.Router();

const authController = new AuthController();

authRouter.post("/register", validateRegister, authController.register);
authRouter.post("/login", validateLogin, authController.login);