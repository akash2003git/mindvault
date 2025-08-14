import User from "../models/User";
import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, email, password } = req.body;
};
