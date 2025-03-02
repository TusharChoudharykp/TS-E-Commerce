"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const productService = __importStar(require("../services/productService"));
const productValidator_1 = require("../validators/productValidator");
// Helper function for Joi validation
const validate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};
// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = async (req, res, next) => {
    try {
        const product = await productService.getProductById(Number(req.params.id));
        if (!product.length) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.status(200).json(product[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.getProductById = getProductById;
// Create a new product (Admin only)
const createProduct = async (req, res, next) => {
    try {
        validate(productValidator_1.productSchema, req.body);
        const result = await productService.createProduct(req.body);
        res
            .status(201)
            .json({ success: true, product: { id: result.insertId, ...req.body } });
    }
    catch (err) {
        next(err);
    }
};
exports.createProduct = createProduct;
// Update a product (Admin only)
const updateProduct = async (req, res, next) => {
    try {
        validate(productValidator_1.productSchema, req.body);
        const result = await productService.updateProduct(Number(req.params.id), req.body);
        if (!result.affectedRows) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Product updated successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProduct = updateProduct;
// Delete a product (Admin only)
const deleteProduct = async (req, res, next) => {
    try {
        const result = await productService.deleteProduct(Number(req.params.id));
        if (!result.affectedRows) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Product deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProduct = deleteProduct;
