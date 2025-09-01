import { z } from "zod";

// <-- Signup Schema -->
export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 charactersl long" })
    .max(20, { message: "Username must not exceed 20 characters" })
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
  password: z.string({
    error: (issue) =>
      issue.input === undefined
        ? "Password  is required"
        : "Password should be a valid string",
  }),
});

// <-- Content Schema -->

export const ContentTypeEnum = z.enum([
  "youtube",
  "twitter",
  "reddit",
  "instagram",
  "code",
  "notion",
  "article",
  "video",
  "note",
  "other",
]);

export const contentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(200, { message: "Title must not exceed 200 characters" }),
  link: z.url({ message: "Invalid URL" }).optional(),
  type: ContentTypeEnum,
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long",
    })
    .optional(),
  tags: z
    .array(z.string().min(1, { message: "Tag cannot be empty." }).trim())
    .min(1, { message: "At least one tag is required." }),
  publicStatus: z.boolean({
    error: (issue) =>
      issue.input === undefined
        ? "public is required"
        : "public should be a valid string",
  }),
  embedding: z.array(z.number()).optional(),
});

// <-- Search Schema -->
export const searchSchema = z.object({
  query: z
    .string()
    .min(3, { message: "Query must be at least 3 characters long." }),
  limit: z
    .number()
    .int()
    .min(1, { message: "Limit must be at least 1." })
    .max(50, { message: "Limit cannot exceed 50." })
    .default(10),
  mode: z.enum(["semantic", "keyword"]).default("semantic"),
});
