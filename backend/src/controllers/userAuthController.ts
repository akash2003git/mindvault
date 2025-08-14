import User, { UserDocument } from "../models/User";
import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { loginSchema, signupSchema } from "../validations/zodSchemas";
import { z } from "zod";
import { JWT_SECRET } from "../config/env";

// Function to generate jwt token
function generateToken(id: string): string {
  return sign({ id }, JWT_SECRET, { expiresIn: "7d" });
}

// Signup controller
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Zod validation
    const validationResult = signupSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      });
    }
    const { username, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "Email already exists" });
      }
      if (existingUser.username === username) {
        return res.status(409).json({ message: "Username already exists" });
      }
    }

    // Create new user with an accessToken
    const user: UserDocument = new User({
      username,
      email,
      password,
    }) as UserDocument;
    await user.save();
    const accessToken = generateToken(user._id.toString());

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      message: "User created successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(error).fieldErrors,
      });
    }
    console.error("Signup error:", error);
    next(error);
  }
};

// Login Controller
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Zod Validation
    const validationResult = loginSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      });
    }

    // Prepare query object based on whether it's an email or a username
    const { identifier, password } = validationResult.data;
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    let query;
    if (isEmail) {
      query = { email: identifier.toLowerCase() };
    } else {
      query = { username: identifier };
    }

    // Find existing user and validate credentials
    const user: UserDocument = (await User.findOne(query).select(
      "+password",
    )) as UserDocument;

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateToken(user._id.toString());
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      message: "User logged in successfully",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(error).fieldErrors,
      });
    }
    console.error("Login error:", error);
    next(error);
  }
};
