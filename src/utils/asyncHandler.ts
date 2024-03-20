import { Request, Response, NextFunction } from "express";
import { ControllerType } from "../types/types.js";

//this help to avoid writting try catch again and again
const asyncHandler = (functionHandler: ControllerType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(functionHandler(req, res, next)).catch((err) => next(err));
  };
};
export { asyncHandler };
