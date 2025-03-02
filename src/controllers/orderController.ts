import { Request, Response, NextFunction } from "express";
import * as orderService from "../services/orderService";
import { AuthRequest } from "../middlewares/authMiddleware";

//Place an Order (User Only)
const placeOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  } catch (err) {
    next(err);
  }
};

//Get Orders for a User
const getUserOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({ message: "Unauthorized. User ID missing" });
      return;
    }

    const userId = req.user.userId;
    const orders = await orderService.getUserOrders(userId);
    res.status(200).json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

//Get Order Details (User/Admin)
const getOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    const order = await orderService.getOrderDetails(orderId);

    if (!Array.isArray(order) || order.length === 0) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    next(err);
  }
};

//Update Order Status (Admin Only)
const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orderId = Number(req.params.id);
    const { status } = req.body;

    await orderService.updateOrderStatus(orderId, status);
    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (err) {
    next(err);
  }
};

export { placeOrder, getUserOrders, getOrderDetails, updateOrderStatus };
