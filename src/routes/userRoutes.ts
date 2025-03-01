import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import authenticateJWT from "../middlewares/authMiddleware";
require("dotenv").config();

const router = express.Router();

router.get("/", authenticateJWT, getAllUsers);
router.get("/:id", authenticateJWT, getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", authenticateJWT, updateUser);
router.delete("/:id", authenticateJWT, deleteUser);

export default router;
