import * as z from "zod";
import { ContentTypes } from "../models/VaultItem";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { error: "Username must have at least 3 characters!" })
    .max(10, { error: "Username must not exceed 10 characters!" })
    .trim(),
  email: z.email({ error: "Invalid email address!" }).trim().toLowerCase(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long!" })
    .max(20, { error: "Password must not exceed 20 characters!" })
    .trim(),
});

export const loginSchema = z
  .object({
    username: z.string().trim().optional(),
    email: z
      .email({ error: "Invalid email address!" })
      .trim()
      .toLowerCase()
      .optional(),
    password: z.string().min(1, { error: "Password is required!" }).trim(),
  })
  .refine((data) => data.username || data.email, {
    error: "Either username or email is required!",
    path: [],
  });

export const vaultSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long!" })
    .max(100, { error: "Title must not exceed 100 characters!" }),
  description: z.string().min(1, { error: "Description is required!" }),
  link: z.url({ error: "Invalid URL" }).optional(),
  type: z.enum(Object.values(ContentTypes) as [string, ...string[]]),
  tags: z.array(z.string()).optional(),
});

export const tagSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Tag must at least be 3 characters long!" }),
});
