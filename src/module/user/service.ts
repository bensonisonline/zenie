import { ErrorResponse, response } from "../utils";
import { userRepository } from "./repository";
import type { User } from "./schema";
import { emailSchema, idSchema } from "./validation";

class UserService {
  static sanitize(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getUserById(id: string) {
    const validate = idSchema.safeParse({ id });
    if (!validate.success) {
      const error = validate.error.flatten().fieldErrors.id;
      if (error) {
        throw new ErrorResponse(400, error[0] as string);
      } else {
        throw new ErrorResponse(400, "Unknown validation error");
      }
    }
    const result = await userRepository.getUserById(id);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    const sanitize = UserService.sanitize(result);
    return response(200, "User found", sanitize);
  }

  async getUserByEmail(email: string) {
    const validate = emailSchema.safeParse({ email });
    if (!validate.success) {
      const error = validate.error.flatten().fieldErrors.email;
      if (error) {
        throw new ErrorResponse(400, error[0] as string);
      } else {
        throw new ErrorResponse(400, "Unknown validation error");
      }
    }
    const result = await userRepository.getUserByEmail(email);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    const sanitize = UserService.sanitize(result);
    return response(200, "User found", sanitize);
  }

  async update(id: string, data: Partial<User>) {
    const validate = idSchema.safeParse({ id });
    if (!validate.success) {
      const error = validate.error.flatten().fieldErrors.id;
      if (error) {
        throw new ErrorResponse(400, error[0] as string);
      } else {
        throw new ErrorResponse(400, "Unknown validation error");
      }
    }
    const date = new Date().toLocaleDateString();
    const result = await userRepository.update(id, {
      ...data,
      updatedAt: date,
    });
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    const santize = UserService.sanitize(result);
    return response(200, "User updated", santize);
  }

  async delete(id: string) {
    const validate = idSchema.safeParse({ id });
    if (!validate.success) {
      const error = validate.error.flatten().fieldErrors.id;
      if (error) {
        throw new ErrorResponse(400, error[0] as string);
      } else {
        throw new ErrorResponse(400, "Unknown validation error");
      }
    }
    const result = await userRepository.delete(id);
    if (!result) {
      throw new ErrorResponse(404, "User not found");
    }
    return response(204, "User deleted");
  }
}

export const userService = new UserService();
