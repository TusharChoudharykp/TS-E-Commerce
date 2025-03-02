"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userRoutes_1 = __importDefault(require("./userRoutes"));
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const productRoutes_1 = __importDefault(require("./productRoutes"));
router.use("/users", userRoutes_1.default);
router.use("/categories", categoryRoutes_1.default);
router.use("/products", productRoutes_1.default);
exports.default = router;
