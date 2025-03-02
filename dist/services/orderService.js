"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getOrderDetails = exports.getUserOrders = exports.placeOrder = void 0;
const orderDb_1 = require("../db/orderDb");
const productDb_1 = require("../db/productDb");
const placeOrder = async (userId, cartItems) => {
    let totalPrice = 0;
    for (const item of cartItems) {
        const product = await (0, productDb_1.getProductByIdFromDb)(item.product_id);
        if (!product || product.length === 0) {
            throw new Error(`Product ID ${item.product_id} not found.`);
        }
        const productPrice = product[0].price; // Fetch price from DB
        totalPrice += productPrice * item.quantity;
    }
    const order = await (0, orderDb_1.placeOrderInDb)(userId, totalPrice);
    const orderId = order.insertId;
    for (const item of cartItems) {
        const product = await (0, productDb_1.getProductByIdFromDb)(item.product_id);
        if (!product || product.length === 0)
            continue; // Skip if product doesn't exist
        await (0, orderDb_1.addOrderItemsInDb)(orderId, item.product_id, item.quantity, product[0].price // Fetch correct price
        );
    }
    return { orderId, totalPrice };
};
exports.placeOrder = placeOrder;
const getUserOrders = async (userId) => {
    return await (0, orderDb_1.getUserOrdersFromDb)(userId);
};
exports.getUserOrders = getUserOrders;
const getOrderDetails = async (orderId) => {
    return await (0, orderDb_1.getOrderDetailsFromDb)(orderId);
};
exports.getOrderDetails = getOrderDetails;
const updateOrderStatus = async (orderId, status) => {
    return await (0, orderDb_1.updateOrderStatusInDb)(orderId, status);
};
exports.updateOrderStatus = updateOrderStatus;
