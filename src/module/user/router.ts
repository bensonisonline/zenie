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
  .get("/:id", userController.get)
  .put("/:id", userController.update)
  .delete("/:id", userController.delete);
