"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const authenticateJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }
    const tokenWithoutBearer = token.startsWith("Bearer ")
        ? token.slice(7)
        : token;
    jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.secret, (err, user) => {
        if (err) {
            res.status(401).json({ message: "Access denied. Invalid token." });
            return;
        }
        req.user = user;
        next();
    });
};
exports.default = authenticateJWT;
