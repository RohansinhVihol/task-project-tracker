import type { Request, Response, NextFunction } from "express";
import { ApiError } from '../utils/apiError.js';

export const errorHandler = (
  err: ApiError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error(err);

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    statusCode,
    success: statusCode < 400,
    message,
    data: {},
  });
};