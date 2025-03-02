"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryFromDb = exports.updateCategoryInDb = exports.insertCategory = exports.getCategoryByIdFromDb = exports.getAllCategoriesFromDb = void 0;
const excuteQuery_1 = __importDefault(require("../models/excuteQuery"));
// Get all categories
const getAllCategoriesFromDb = async () => {
    return await (0, excuteQuery_1.default)("SELECT * FROM categories");
};
exports.getAllCategoriesFromDb = getAllCategoriesFromDb;
// Get category by ID
const getCategoryByIdFromDb = async (id) => {
    return await (0, excuteQuery_1.default)("SELECT * FROM categories WHERE id = ?", [id]);
};
exports.getCategoryByIdFromDb = getCategoryByIdFromDb;
// Insert new category
const insertCategory = async (category) => {
    return await (0, excuteQuery_1.default)("INSERT INTO categories (name, icon, color, text) VALUES (?, ?, ?, ?)", [category.name, category.icon, category.color, category.text]);
};
exports.insertCategory = insertCategory;
// Update category
const updateCategoryInDb = async (id, category) => {
    return await (0, excuteQuery_1.default)("UPDATE categories SET name = ?, icon = ?, color = ?, text = ? WHERE id = ?", [category.name, category.icon, category.color, category.text, id]);
};
exports.updateCategoryInDb = updateCategoryInDb;
// Delete category
const deleteCategoryFromDb = async (id) => {
    return await (0, excuteQuery_1.default)("DELETE FROM categories WHERE id = ?", [id]);
};
exports.deleteCategoryFromDb = deleteCategoryFromDb;
