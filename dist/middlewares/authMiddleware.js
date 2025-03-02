"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRole = exports.authenticateJWT = void 0;
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
    if (!process.env.secret) {
        throw new Error("JWT Secret is missing in environment variables.");
    }
    jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.secret, (err, decoded) => {
        if (err || !decoded || typeof decoded === "string") {
            res.status(401).json({ message: "Access denied. Invalid token." });
            return;
        }
        const payload = decoded;
        req.user = { userId: payload.userId, role: payload.role };
        next();
    });
};
exports.authenticateJWT = authenticateJWT;
const authorizeRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        res.status(403).json({ message: "Forbidden: Access denied" });
        return;
    }
    next();
};
exports.authorizeRole = authorizeRole;
