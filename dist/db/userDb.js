"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserFromDb = exports.updateUserInDb = exports.insertUser = exports.getUserByEmail = exports.getUserByIdFromDb = exports.getAllUsersFromDb = void 0;
const excuteQuery_1 = __importDefault(require("../models/excuteQuery"));
// Get all users
const getAllUsersFromDb = async () => {
    return await (0, excuteQuery_1.default)("SELECT id, name, email, phone, landmark, flatnumber, pincode, city, state FROM users");
};
exports.getAllUsersFromDb = getAllUsersFromDb;
// Get user by ID
const getUserByIdFromDb = async (id) => {
    return await (0, excuteQuery_1.default)("SELECT id, name, email, phone, landmark, flatnumber, pincode, city, state FROM users WHERE id = ?", [id]);
};
exports.getUserByIdFromDb = getUserByIdFromDb;
// Get user by email
const getUserByEmail = async (email) => {
    return await (0, excuteQuery_1.default)("SELECT * FROM users WHERE email = ?", [email]);
};
exports.getUserByEmail = getUserByEmail;
// Insert new user
const insertUser = async (userData) => {
    const { name, email, passwordHash, phone, landmark, flatnumber, pincode, city, state, } = userData;
    return await (0, excuteQuery_1.default)("INSERT INTO users (name, email, passwordHash, phone, landmark, flatnumber, pincode, city, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [
        name,
        email,
        passwordHash,
        phone,
        landmark || "",
        flatnumber || "",
        pincode || "",
        city || "",
        state || "",
    ]);
};
exports.insertUser = insertUser;
// Update user
const updateUserInDb = async (id, userData) => {
    const { name, email, passwordHash, phone, landmark, flatnumber, pincode, city, state, } = userData;
    return await (0, excuteQuery_1.default)("UPDATE users SET name = ?, email = ?, passwordHash = ?, phone = ?, landmark = ?, flatnumber = ?, pincode = ?, city = ?, state = ? WHERE id = ?", [
        name,
        email,
        passwordHash,
        phone,
        landmark,
        flatnumber,
        pincode,
        city,
        state,
        id,
    ]);
};
exports.updateUserInDb = updateUserInDb;
// Delete user
const deleteUserFromDb = async (id) => {
    return await (0, excuteQuery_1.default)("DELETE FROM users WHERE id = ?", [id]);
};
exports.deleteUserFromDb = deleteUserFromDb;
