import jwt from "jsonwebtoken";
import {
  comparePassword,
  ErrorResponse,
  hashPassword,
  response,
} from "../utils";
import { userRepository } from "./repository";
import type { User } from "./schema";

import "dotenv/config";
import { loginSchema, registerSchema } from "./validation";

class AuthService {
  static token(user: User) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const santize: {
      id: string;
      name: string;
      email: string;
      createdAt: string | null;
      token: string;
    } = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      token: accessToken,
    };

    return santize;
  }

  async register(data: User) {
    const { email, password, name } = data;

    const validate = registerSchema.safeParse({ name, email, password });
    if (!validate.success) {
      const errors = validate.error.issues;

      const errorMessages = errors.map((issue) => {
        const field = issue.path.join(".");
        return `${field}: ${issue.message}`;
      });
      throw new ErrorResponse(400, errorMessages.join(", "));
    }

    const existing = await userRepository.getUserByEmail(data.email);
    if (existing) throw new ErrorResponse(400, "User with this email exists");

    const hashedPassword = hashPassword(data.password);
    const user = await userRepository.create({
      ...data,
      password: hashedPassword,
    });

    if (!user) throw new ErrorResponse(500, "Something went wrong. Try again");

    const newUser = AuthService.token(user);

    return response(201, "User created successfully", newUser);
  }

  async login(email: string, password: string) {
    const validate = loginSchema.safeParse({ email, password });
    if (!validate.success) {
      const errors = validate.error.issues;

      const errorMessages = errors.map((issue) => {
        const field = issue.path.join(".");
        return `${field}: ${issue.message}`;
      });
      throw new ErrorResponse(400, errorMessages.join(", "));
    }

    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new ErrorResponse(400, "Invalid credentials");

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) throw new ErrorResponse(400, "Invalid credentials");

    const token = AuthService.token(user);

    return response(200, "Login successful", token);
  }
}

export const authService = new AuthService();
