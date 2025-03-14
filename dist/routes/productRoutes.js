"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get("/", productController_1.getAllProducts);
router.get("/:id", productController_1.getProductById);
router.post("/", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(["admin"]), productController_1.createProduct);
router.put("/:id", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(["admin"]), productController_1.updateProduct);
router.delete("/:id", authMiddleware_1.authenticateJWT, (0, authMiddleware_1.authorizeRole)(["admin"]), productController_1.deleteProduct);
exports.default = router;
