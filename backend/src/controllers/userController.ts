import User from "../models/User";
import { Request, Response, NextFunction } from "express";

export async function getMe(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.userId;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
