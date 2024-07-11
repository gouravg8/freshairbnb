import { z } from "zod";

const signupSchema = z.object({
  name: z.string(),
  username: z
    .string()
    .min(5, { message: "username should be at least 5 character long" }),
  password: z
    .string()
    .min(6, { message: "username should be at least 6 character long" }),
});

const loginSchema = z.object({
  username: z
    .string()
    .min(5, { message: "username should be at least 5 character long" }),
  password: z
    .string()
    .min(6, { message: "username should be at least 6 character long" }),
});

export { signupSchema, loginSchema };
