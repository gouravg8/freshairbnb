import { Request, Response } from "express";
import { signupSchema, loginSchema } from "../zod";
import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
process.loadEnvFile(".env");
const JWTSECRET = process.env.JWT_SECRET;

async function signupController(req: Request, res: Response) {
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
        res.json({ message: "user created successfully", jwtToken });
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
}

async function loginController(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const zodValidation = loginSchema.safeParse({ username, password });
    if (zodValidation.success) {
      const dbCall = await prisma.user.findFirst({ where: { username } });
      if (dbCall && dbCall?.password) {
        bcryptjs.compare(password, dbCall?.password, (err, success) => {
          if (err) {
            throw err;
          }
          if (success) {
            res.json({ message: "logged in", token: dbCall.jwtToken });
          } else {
            res.status(401).json({ message: "wrong password" });
          }
        });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } else {
      res.json({ message: zodValidation });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export { signupController, loginController };
