import * as z from "zod";
import { signupSchema, loginSchema } from "../validators/zodSchemas";
import { User } from "../models/User";
import { sign } from "jsonwebtoken";
import { Request, Response } from "express";

function generateToken(id: string): string {
  return sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = signupSchema.parse(req.body);

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists!" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already exists!" });
    }

    const user = new User({ username, email, password });
    await user.save();

    const accessToken = generateToken(user._id.toString());

    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      message: "New user signed-up successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error: ", error);
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Server Error during singup: ", error);
    return res
      .status(500)
      .json({ message: "Server error during singup.", error });
  }
};

export const logIn = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = loginSchema.parse(req.body);

    const query = username ? { username } : { email };

    const user = await User.findOne(query);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with provided credentials not found!" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email/Username or password is incorrect!" });
    }

    const accessToken = generateToken(user._id.toString());

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      message: "User logged-in successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error: ", error);
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Server Error during login: ", error);
    return res.status(500).json({
      message: "Server error during login.",
      error,
    });
  }
};
