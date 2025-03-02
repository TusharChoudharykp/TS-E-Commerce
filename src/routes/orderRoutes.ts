import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
} from "../controllers/orderController";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware";

const router = express.Router();

//User Routes
router.post("/", authenticateJWT, placeOrder);
router.get("/", authenticateJWT, getUserOrders);
router.get("/:id", authenticateJWT, getOrderDetails);

//Admin Routes
router.put(
  "/:id/status",
  authenticateJWT,
  authorizeRole(["admin"]),
  updateOrderStatus
);

export default router;
