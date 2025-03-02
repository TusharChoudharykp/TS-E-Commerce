import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", authenticateJWT, authorizeRole(["admin"]), createProduct);
router.put("/:id", authenticateJWT, authorizeRole(["admin"]), updateProduct);
router.delete("/:id", authenticateJWT, authorizeRole(["admin"]), deleteProduct);

export default router;
