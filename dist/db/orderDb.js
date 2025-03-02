"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatusInDb = exports.getOrderDetailsFromDb = exports.getUserOrdersFromDb = exports.addOrderItemsInDb = exports.placeOrderInDb = void 0;
const excuteQuery_1 = __importDefault(require("../models/excuteQuery"));
//Place an order
const placeOrderInDb = async (userId, totalPrice) => {
    return await (0, excuteQuery_1.default)("INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, 'pending')", [userId, totalPrice]);
};
exports.placeOrderInDb = placeOrderInDb;
//Insert order items
const addOrderItemsInDb = async (orderId, productId, quantity, price) => {
    return await (0, excuteQuery_1.default)("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)", [orderId, productId, quantity, price]);
};
exports.addOrderItemsInDb = addOrderItemsInDb;
// Get user orders
const getUserOrdersFromDb = async (userId) => {
    return await (0, excuteQuery_1.default)("SELECT * FROM orders WHERE user_id = ?", [userId]);
};
exports.getUserOrdersFromDb = getUserOrdersFromDb;
//Get order details
const getOrderDetailsFromDb = async (orderId) => {
    return await (0, excuteQuery_1.default)("SELECT * FROM order_items WHERE order_id = ?", [
        orderId,
    ]);
};
exports.getOrderDetailsFromDb = getOrderDetailsFromDb;
//Update order status
const updateOrderStatusInDb = async (orderId, status) => {
    return await (0, excuteQuery_1.default)("UPDATE orders SET status = ? WHERE id = ?", [
        status,
        orderId,
    ]);
};
exports.updateOrderStatusInDb = updateOrderStatusInDb;
