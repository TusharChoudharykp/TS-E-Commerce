import express from "express";
const router = express.Router();

import userRoutes from "./userRoutes";
import categoryRoutes from "./categoryRoutes";

router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

export default router;
