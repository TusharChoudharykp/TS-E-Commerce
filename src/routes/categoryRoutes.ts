import express from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.post("/", authenticateJWT, authorizeRole(["admin"]), createCategory);
router.put("/:id", authenticateJWT, authorizeRole(["admin"]), updateCategory);
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin"]),
  deleteCategory
);

export default router;
