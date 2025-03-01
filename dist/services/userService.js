"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getAllUsersFromDb, getUserByIdFromDb, getUserByEmail, insertUser, updateUserInDb, deleteUserFromDb, } = require("../db/userDb");
require("dotenv").config();
const getAllUsers = async () => {
    return await getAllUsersFromDb();
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return await getUserByIdFromDb(id);
};
exports.getUserById = getUserById;
const registerUser = async (userData) => {
    const { name, email, password, phone, landmark, flatnumber, pincode, city, state, } = userData;
    const existingUser = await getUserByEmail(email);
    if (existingUser.length) {
        throw new Error("Email already in use");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await insertUser({
        name,
        email,
        passwordHash: hashedPassword,
        phone,
        landmark,
        flatnumber,
        pincode,
        city,
        state,
    });
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user.length || !bcrypt.compareSync(password, user[0].passwordHash)) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ userId: user[0].id }, process.env.secret, {
        expiresIn: "3d",
    });
    return { email: user[0].email, token };
};
exports.loginUser = loginUser;
const updateUser = async (id, userData) => {
    const { name, email, password, phone, landmark, flatnumber, pincode, city, state, } = userData;
    const hashedPassword = password ? bcrypt.hashSync(password, 10) : undefined;
    return await updateUserInDb(id, {
        name,
        email,
        passwordHash: hashedPassword,
        phone,
        landmark,
        flatnumber,
        pincode,
        city,
        state,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    return await deleteUserFromDb(id);
};
exports.deleteUser = deleteUser;
