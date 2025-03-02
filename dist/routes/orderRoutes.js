"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
//User Routes
router.post("/", authMiddleware_1.authenticateJWT, orderController_1.placeOrder);
router.get("/", authMiddleware_1.authenticateJWT, orderController_1.getUserOrders);
router.get("/:id", authMiddleware_1.authenticateJWT, orderController_1.getOrderDetails);
//Admin Routes
router.put("/:id/status", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(["admin"]), orderController_1.updateOrderStatus);
exports.default = router;
