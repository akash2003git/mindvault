import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

interface CustomError extends Error {
  statusCode?: number;
  status?: number;
  message: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("An unhandled error occurred:", err);

  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
  }

  if (err.name === "MongoServerError" && (err as any).code === 11000) {
    statusCode = 409; // Conflict
    message = "Duplicate key error: A record with this value already exists.";
  }

  res.status(statusCode).json({
    message: message,
  });
};

export default errorHandler;
