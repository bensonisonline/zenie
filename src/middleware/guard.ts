import type { User } from "@/module/user/schema";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
    }
  }
}

interface TokenPayload extends JwtPayload {
  user: User;
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const guard = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
    if (!decoded || typeof decoded === "string") {
      return res.status(403).json({ error: "Invalid token payload" });
    }
     const payload = decoded as TokenPayload;
     
    req.user = { id: payload.id, email: payload.email };
    next();
  });
};
