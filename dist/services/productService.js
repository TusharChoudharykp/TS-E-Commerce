"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const productDb_1 = require("../db/productDb");
// Get all products
const getAllProducts = async () => {
    return await (0, productDb_1.getAllProductsFromDb)();
};
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = async (id) => {
    return await (0, productDb_1.getProductByIdFromDb)(id);
};
exports.getProductById = getProductById;
// Create a new product (Admin only)
const createProduct = async (productData) => {
    return await (0, productDb_1.insertProduct)(productData);
};
exports.createProduct = createProduct;
// Update a product (Admin only)
const updateProduct = async (id, productData) => {
    return await (0, productDb_1.updateProductInDb)(id, productData);
};
exports.updateProduct = updateProduct;
// Delete a product (Admin only)
const deleteProduct = async (id) => {
    return await (0, productDb_1.deleteProductFromDb)(id);
};
exports.deleteProduct = deleteProduct;
