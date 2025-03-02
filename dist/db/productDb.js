"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductFromDb = exports.updateProductInDb = exports.insertProduct = exports.getProductByIdFromDb = exports.getAllProductsFromDb = void 0;
const excuteQuery_1 = __importDefault(require("../models/excuteQuery"));
// Get all products
const getAllProductsFromDb = async () => {
    return await (0, excuteQuery_1.default)("SELECT * FROM products");
};
exports.getAllProductsFromDb = getAllProductsFromDb;
// Get product by ID
const getProductByIdFromDb = async (id) => {
    return await (0, excuteQuery_1.default)("SELECT * FROM products WHERE id = ?", [id]);
};
exports.getProductByIdFromDb = getProductByIdFromDb;
// Insert new product
const insertProduct = async (productData) => {
    const { name, description, price, category_id, stock, image } = productData;
    return await (0, excuteQuery_1.default)(`INSERT INTO products (name, description, price, category_id, stock, image) 
     VALUES (?, ?, ?, ?, ?, ?)`, [name, description, price, category_id, stock, image || null]);
};
exports.insertProduct = insertProduct;
// Update product
const updateProductInDb = async (id, productData) => {
    const { name, description, price, category_id, stock, image } = productData;
    return await (0, excuteQuery_1.default)(`UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, stock = ?, image = ? 
     WHERE id = ?`, [name, description, price, category_id, stock, image || null, id]);
};
exports.updateProductInDb = updateProductInDb;
// Delete product
const deleteProductFromDb = async (id) => {
    return await (0, excuteQuery_1.default)("DELETE FROM products WHERE id = ?", [id]);
};
exports.deleteProductFromDb = deleteProductFromDb;
