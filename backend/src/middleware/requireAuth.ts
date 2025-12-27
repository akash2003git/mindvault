import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";

export interface JwtUserPayload extends JwtPayload {
  id: string;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res
          .status(401)
          .json({ message: "Not authorized, token not provided!" });
      }

      const decoded = verify(
        token,
        process.env.JWT_SECRET as string,
      ) as JwtUserPayload;

      req.user = { id: decoded.id };
      next();
    } catch (error) {
      console.error("Access token verification failed: ", error);
      return res
        .status(401)
        .json({ message: "Not authorized, access token invalid or expired!" });
    }
  } else {
    return res.status(401).json({
      message: "Not authorized, access token format is incorrect or missing!",
    });
  }
};
