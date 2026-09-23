import { validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import { ApiError } from "../utils/apiError.js";

export const validate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new ApiError(400,"Validation Error....");
  }

  next();
};