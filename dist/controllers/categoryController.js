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
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const categoryService = __importStar(require("../services/categoryService"));
const catogoryValidator_1 = require("../validators/catogoryValidator");
const validate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res, next) => {
    try {
        const category = await categoryService.getCategoryById(Number(req.params.id));
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.status(200).json(category);
    }
    catch (err) {
        next(err);
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res, next) => {
    try {
        validate(catogoryValidator_1.categorySchema, req.body);
        const result = await categoryService.createCategory(req.body);
        res
            .status(201)
            .json({ success: true, category: { id: result.insertId, ...req.body } });
    }
    catch (err) {
        next(err);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res, next) => {
    try {
        validate(catogoryValidator_1.categorySchema, req.body);
        const result = await categoryService.updateCategory(Number(req.params.id), req.body);
        if (!result.affectedRows) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Category updated successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const result = await categoryService.deleteCategory(Number(req.params.id));
        if (!result.affectedRows) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteCategory = deleteCategory;
