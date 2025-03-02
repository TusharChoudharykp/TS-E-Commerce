"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const joi_1 = __importDefault(require("joi"));
const categorySchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    icon: joi_1.default.string().uri().required(), // Icon should be a valid URL
    color: joi_1.default.string().min(3).required(),
    text: joi_1.default.string().min(5).required(),
});
exports.categorySchema = categorySchema;
