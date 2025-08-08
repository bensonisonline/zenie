import type { Request, Response } from "express";
import { userService } from "./service";
import { authService } from "./auth";
import type { User } from "./schema";

class UserController {
  constructor() {}

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const user = await authService.register({ name, email, password } as User);
    return res.status(user.statusCode).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    return res.status(user.statusCode).json(user);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.getUserById(id!);
    return res.status(user.statusCode).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await userService.update(id!, { name, email });
    return res.status(user.statusCode).json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.delete(id!);
    return res.status(user.statusCode).json(user);
  }
}

export const userController = new UserController();