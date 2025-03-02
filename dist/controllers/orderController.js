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
exports.updateOrderStatus = exports.getOrderDetails = exports.getUserOrders = exports.placeOrder = void 0;
const orderService = __importStar(require("../services/orderService"));
//Place an Order (User Only)
const placeOrder = async (req, res, next) => {
    try {
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: "Unauthorized. User ID missing" });
            return;
        }
        const userId = req.user.userId;
        const { cartItems } = req.body;
        if (!cartItems || cartItems.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        const order = await orderService.placeOrder(userId, cartItems);
        res.status(201).json({ success: true, order });
    }
    catch (err) {
        next(err);
    }
};
exports.placeOrder = placeOrder;
//Get Orders for a User
const getUserOrders = async (req, res, next) => {
    try {
        if (!req.user || !req.user.userId) {
            res.status(401).json({ message: "Unauthorized. User ID missing" });
            return;
        }
        const userId = req.user.userId;
        const orders = await orderService.getUserOrders(userId);
        res.status(200).json({ success: true, orders });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserOrders = getUserOrders;
//Get Order Details (User/Admin)
const getOrderDetails = async (req, res, next) => {
    try {
        const orderId = Number(req.params.id);
        const order = await orderService.getOrderDetails(orderId);
        if (!Array.isArray(order) || order.length === 0) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json({ success: true, order });
    }
    catch (err) {
        next(err);
    }
};
exports.getOrderDetails = getOrderDetails;
//Update Order Status (Admin Only)
const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = Number(req.params.id);
        const { status } = req.body;
        await orderService.updateOrderStatus(orderId, status);
        res.status(200).json({ success: true, message: "Order status updated" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateOrderStatus = updateOrderStatus;
