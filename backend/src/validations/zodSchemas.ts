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
  password: z.string({ required_error: "Password is required" }),
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
  "other",
]);

const metadataSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    thumbnail: z.url("Invalid thumbnail URL format").optional(),
  })
  .optional();

export const contentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(200, { message: "Title must not exceed 200 characters" }),
  link: z
    .string({ required_error: "Link is required" })
    .trim()
    .pipe(z.url({ message: "Invalid URL" })),
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
  public: z.boolean({
    required_error: "Public status is required.",
  }),
  metadata: metadataSchema,
  embedding: z.array(z.number()).optional(),
});
