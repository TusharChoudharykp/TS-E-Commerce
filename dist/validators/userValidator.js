"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.loginUserSchema = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const registerUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    phone: joi_1.default.string().min(10).max(15).required(),
    landmark: joi_1.default.string().optional(),
    flatnumber: joi_1.default.string().optional(),
    pincode: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
});
exports.registerUserSchema = registerUserSchema;
const loginUserSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.loginUserSchema = loginUserSchema;
const updateUserSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).optional(),
    email: joi_1.default.string().email().optional(),
    password: joi_1.default.string().min(6).optional(),
    phone: joi_1.default.string().min(10).max(15).optional(),
    landmark: joi_1.default.string().optional(),
    flatnumber: joi_1.default.string().optional(),
    pincode: joi_1.default.string().optional(),
    city: joi_1.default.string().optional(),
    state: joi_1.default.string().optional(),
});
exports.updateUserSchema = updateUserSchema;
