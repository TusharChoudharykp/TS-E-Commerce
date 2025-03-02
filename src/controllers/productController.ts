import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productService";
import { productSchema } from "../validators/productValidator";

// Helper function for Joi validation
const validate = (schema: any, data: any) => {
  const { error } = schema.validate(data);
  if (error) {
    throw new Error(error.details[0].message);
  }
};

// Get all products
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by ID
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const product = await productService.getProductById(Number(req.params.id));
    if (!product.length) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product[0]);
  } catch (err) {
    next(err);
  }
};

// Create a new product (Admin only)
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(productSchema, req.body);
    const result = await productService.createProduct(req.body);
    res
      .status(201)
      .json({ success: true, product: { id: result.insertId, ...req.body } });
  } catch (err) {
    next(err);
  }
};

// Update a product (Admin only)
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    validate(productSchema, req.body);
    const result = await productService.updateProduct(
      Number(req.params.id),
      req.body
    );
    if (!result.affectedRows) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    next(err);
  }
};

// Delete a product (Admin only)
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await productService.deleteProduct(Number(req.params.id));
    if (!result.affectedRows) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};
