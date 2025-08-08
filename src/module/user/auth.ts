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

class AuthService {
  static token(user: User) {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    const santize: { name: string; email: string; token: string } = {
      name: user.name,
      email: user.email,
      token: accessToken,
    };

    return santize;
  }

  async register(data: User) {
    if (!(data.email, data.name, data.password))
      throw new ErrorResponse(400, "All fields are required");

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
    const user = await userRepository.getUserByEmail(email);
    if (!user) throw new ErrorResponse(400, "Invalid credentials");

    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) throw new ErrorResponse(400, "Invalid credentials");

    const token = AuthService.token(user);

    return response(200, "Login successful", token);
  }
}

export const authService = new AuthService();
