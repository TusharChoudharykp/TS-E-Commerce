import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { authenticateJWT, authorizeRole } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authenticateJWT, authorizeRole(["admin"]), getAllUsers);
router.get(
  "/:id",
  authenticateJWT,
  authorizeRole(["admin", "user"]),
  getUserById
);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put(
  "/:id",
  authenticateJWT,
  authorizeRole(["user", "admin"]),
  updateUser
);
router.delete("/:id", authenticateJWT, authorizeRole(["admin"]), deleteUser);

export default router;
