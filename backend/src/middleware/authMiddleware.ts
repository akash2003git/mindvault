import { verify, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized, token not provided" });
      }

      const decoded = verify(token, JWT_SECRET) as DecodedToken;
      req.userId = decoded.id;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    console.warn(
      "Authentication attempt without valid Authorization header format:",
      req.headers.authorization,
    );
    return res.status(401).json({
      message: "Not authorized, token format is incorrect or missing!",
    });
  }
}
