import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import * as categoryService from "../services/categoryService";
import { categorySchema } from "../validators/catogoryValidator";

const validate = (schema: any, data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await categoryService.getCategoryById(
      Number(req.params.id)
    );
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

const createCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(categorySchema, req.body);
    const result = await categoryService.createCategory(req.body);
    res
      .status(201)
      .json({ success: true, category: { id: result.insertId, ...req.body } });
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(categorySchema, req.body);
    const result = await categoryService.updateCategory(
      Number(req.params.id),
      req.body
    );
    if (!result.affectedRows) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Category updated successfully" });
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await categoryService.deleteCategory(Number(req.params.id));
    if (!result.affectedRows) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
