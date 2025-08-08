import { ErrorResponse, response } from "../utils";
import { userRepository } from "./repository";
import type { User } from "./schema";

class UserService {
  async getUserById(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }
    const result = await userRepository.getUserById(id);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    return response(200, "User found", result);
  }

  async getUserByEmail(email: string) {
    if (!email) {
      throw new Error("Email is required");
    }
    const result = await userRepository.getUserByEmail(email);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    return response(200, "User found", result);
  }

  async update(id: string, data: Partial<User>) {
    if (!id) {
      throw new Error("User ID is required");
    }
    const result = await userRepository.update(id, data);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    return response(200, "User updated", result);
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("User ID is required");
    }
    const result = await userRepository.delete(id);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    return response(204, "User deleted");
  }
}

export const userService = new UserService();
