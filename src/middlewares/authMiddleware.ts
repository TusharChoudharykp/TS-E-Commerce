import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
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

  jwt.verify(tokenWithoutBearer, process.env.secret as string, (err, user) => {
    if (err) {
      res.status(401).json({ message: "Access denied. Invalid token." });
      return;
    }

    req.user = user as { id: number; role: string };
    next();
  });
};

const authorizeRole =
  (roles: string[]) =>
  (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: "Forbidden: Access denied" });
      return;
    }
    next();
  };

export { authenticateJWT, authorizeRole, AuthRequest };
