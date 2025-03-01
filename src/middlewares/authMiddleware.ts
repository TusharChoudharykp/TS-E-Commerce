import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config();

interface AuthRequest extends Request {
  user?: any;
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

  jwt.verify(tokenWithoutBearer, process.env.secret as string, (err, user) => {
    if (err) {
      res.status(401).json({ message: "Access denied. Invalid token." });
      return;
    }

    req.user = user;
    next();
  });
};

export default authenticateJWT;
