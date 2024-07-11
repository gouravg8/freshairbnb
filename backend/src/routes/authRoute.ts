import express from "express";
import { signupSchema, loginSchema } from "../zod";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const authRouter = express.Router();
const prisma = new PrismaClient();
process.loadEnvFile(".env");
const JWTSECRET = process.env.JWT_SECRET;

authRouter.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;
  try {
    const zodValidation = signupSchema.safeParse({ name, username, password });
    const hashedPassword = await bcryptjs.hash(password, 10);

    let jwtToken;
    if (JWTSECRET) {
      jwtToken = jwt.sign({ name, username }, JWTSECRET);
    }

    if (zodValidation.success && jwtToken) {
      const existed = await prisma.user.findFirst({ where: { username } });
      if (!existed) {
        const dbCall = await prisma.user.create({
          data: { name, username, password: hashedPassword, jwtToken },
        });
        res.json({ message: "user created successfully" });
      } else {
        res.status(401).json({ message: "user already existed" });
      }
    } else {
      console.log("error: zod not success", zodValidation.error);

      res.status(401).json({ message: zodValidation.error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const zodValidation = loginSchema.safeParse({ username, password });
    if (zodValidation.success) {
      res.json({ message: "ho gaya" });
    } else {
      res.json({ message: zodValidation });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default authRouter;
