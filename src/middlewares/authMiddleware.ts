import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

interface AuthRequest extends Request {
  user?: { userId: number; role: string };
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

  jwt.verify(
    tokenWithoutBearer,
    process.env.secret as string,
    (err, decoded) => {
      if (err || !decoded || typeof decoded === "string") {
        res.status(401).json({ message: "Access denied. Invalid token." });
        return;
      }

      const payload = decoded as JwtPayload;
      req.user = { userId: payload.userId, role: payload.role };
      next();
    }
  );
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
