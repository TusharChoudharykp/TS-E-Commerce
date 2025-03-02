"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDb_1 = require("../db/userDb");
const getAllUsers = async () => await (0, userDb_1.getAllUsersFromDb)();
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => await (0, userDb_1.getUserByIdFromDb)(id);
exports.getUserById = getUserById;
const registerUser = async (userData) => {
    const { name, email, password, phone, role = "user", landmark, flatnumber, pincode, city, state, } = userData;
    const existingUser = await (0, userDb_1.getUserByEmail)(email);
    if (existingUser.length > 0) {
        throw new Error("Email already in use");
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    return await (0, userDb_1.insertUser)({
        name,
        email,
        passwordHash: hashedPassword,
        phone,
        role,
        landmark,
        flatnumber,
        pincode,
        city,
        state,
    });
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await (0, userDb_1.getUserByEmail)(email);
    if (!user.length || !bcryptjs_1.default.compareSync(password, user[0].passwordHash)) {
        throw new Error("Invalid credentials");
    }
    if (!process.env.secret) {
        throw new Error("JWT Secret is missing in environment variables.");
    }
    // Get role from the database
    const { role } = user[0];
    // Generate JWT token with role
    const token = jsonwebtoken_1.default.sign({ userId: user[0].id, role }, process.env.secret, {
        expiresIn: "3d",
    });
    return { email: user[0].email, role, token };
};
exports.loginUser = loginUser;
const updateUser = async (id, userData) => {
    const { name, email, password, phone, role, landmark, flatnumber, pincode, city, state, } = userData;
    const hashedPassword = password ? bcryptjs_1.default.hashSync(password, 10) : undefined;
    return await (0, userDb_1.updateUserInDb)(id, {
        name,
        email,
        passwordHash: hashedPassword,
        phone,
        role,
        landmark,
        flatnumber,
        pincode,
        city,
        state,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => await (0, userDb_1.deleteUserFromDb)(id);
exports.deleteUser = deleteUser;
