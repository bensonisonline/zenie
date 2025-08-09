import { guard } from "@/middleware/guard";
import { userController } from "./controller";
import { Router } from "express";

export const userRouter = Router();
export const authRouter = Router();

authRouter
  .post("/register", userController.register)
  .post("/login", userController.login);

userRouter
  .use(guard)
  .get("/", userController.get)
  .put("/", userController.update)
  .delete("/", userController.delete);
