import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";
import {
  registerUserSchema,
  loginUserSchema,
  updateUserSchema,
} from "../validators/userValidator";
import Joi from "joi";

// Helper function for Joi validation
const validate = (schema: Joi.ObjectSchema, data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

// Get all users (Admin Only)
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userService.getUserById(Number(req.params.id));
    if (!user.length) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user[0]);
  } catch (err) {
    next(err);
  }
};

// Register a new user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(registerUserSchema, req.body);
    const result = await userService.registerUser(req.body);
    res
      .status(201)
      .json({ success: true, user: { id: result.insertId, ...req.body } });
  } catch (err) {
    next(err);
  }
};

// User login
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(loginUserSchema, req.body);

    // Get email, password, and role from the request body
    const { email, password } = req.body;

    // Call login service
    const { role, token } = await userService.loginUser(email, password);

    res.status(200).json({ success: true, user: { email, role }, token });
  } catch (err) {
    next(err);
  }
};

// Update user
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(updateUserSchema, req.body);
    const result = await userService.updateUser(
      Number(req.params.id),
      req.body
    );
    if (!result.affectedRows) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await userService.deleteUser(Number(req.params.id));
    if (!result.affectedRows) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
