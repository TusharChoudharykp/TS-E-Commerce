"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
const userService = __importStar(require("../services/userService"));
const userValidator_1 = require("../validators/userValidator");
// Helper function for Joi validation
const validate = (schema, data) => {
    const { error } = schema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};
// Get all users (Admin Only)
const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user.length) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user[0]);
    }
    catch (err) {
        next(err);
    }
};
exports.getUserById = getUserById;
// Register a new user
const registerUser = async (req, res, next) => {
    try {
        validate(userValidator_1.registerUserSchema, req.body);
        const result = await userService.registerUser(req.body);
        res
            .status(201)
            .json({ success: true, user: { id: result.insertId, ...req.body } });
    }
    catch (err) {
        next(err);
    }
};
exports.registerUser = registerUser;
// User login
const loginUser = async (req, res, next) => {
    try {
        validate(userValidator_1.loginUserSchema, req.body);
        const { email, password } = req.body;
        const { role, token } = await userService.loginUser(email, password);
        res.status(200).json({ success: true, user: { email, role }, token });
    }
    catch (err) {
        next(err);
    }
};
exports.loginUser = loginUser;
// Update user
const updateUser = async (req, res, next) => {
    try {
        validate(userValidator_1.updateUserSchema, req.body);
        const result = await userService.updateUser(Number(req.params.id), req.body);
        if (!result.affectedRows) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "User updated successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
// Delete user
const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUser(Number(req.params.id));
        if (!result.affectedRows) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "User deleted successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
