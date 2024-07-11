import express from "express";
const authRouter = express.Router();
import {
  loginController,
  signupController,
} from "../controllers/authController";
process.loadEnvFile(".env");

authRouter.post("/signup", signupController);

authRouter.post("/login", loginController);

export default authRouter;
