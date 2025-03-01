import { Response } from "express";

const successResponse = (
  res: Response,
  data: any,
  message: string = "Success"
): void => {
  res.status(200).json({ success: true, message, data });
};

const errorResponse = (
  res: Response,
  error: Error,
  statusCode: number = 500
): void => {
  res.status(statusCode).json({ success: false, message: error.message });
};

export { successResponse, errorResponse };
