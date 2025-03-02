import express from "express";
const router = express.Router();

import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";
import productRoutes from "./productRoutes";

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;
