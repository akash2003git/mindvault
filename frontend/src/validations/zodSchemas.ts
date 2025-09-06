import { z } from "zod";

// <-- Signup Schema -->
export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must not exceed 20 characters." })
    .trim(),
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(20, { message: "Password must be no more than 20 characters long." }),
});

// <-- Login Schema -->
const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long." })
  .max(20, { message: "Username must not exceed 20 characters." })
  .trim();

const emailSchema = z
  .email({ message: "Invalid email address." })
  .trim()
  .toLowerCase();

export const loginSchema = z.object({
  identifier: z.union([usernameSchema, emailSchema]),
  password: z.string().min(1, { message: "Password is required." }),
});
