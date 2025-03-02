"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const categoryDb_1 = require("../db/categoryDb");
// Get all categories
const getAllCategories = async () => {
    return await (0, categoryDb_1.getAllCategoriesFromDb)();
};
exports.getAllCategories = getAllCategories;
// Get category by ID
const getCategoryById = async (id) => {
    return await (0, categoryDb_1.getCategoryByIdFromDb)(id);
};
exports.getCategoryById = getCategoryById;
// Create a new category
const createCategory = async (categoryData) => {
    return await (0, categoryDb_1.insertCategory)(categoryData);
};
exports.createCategory = createCategory;
// Update category
const updateCategory = async (id, categoryData) => {
    return await (0, categoryDb_1.updateCategoryInDb)(id, categoryData);
};
exports.updateCategory = updateCategory;
// Delete category
const deleteCategory = async (id) => {
    return await (0, categoryDb_1.deleteCategoryFromDb)(id);
};
exports.deleteCategory = deleteCategory;
