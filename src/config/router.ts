import { authRouter, userRouter } from "@/module/user/router";
import { Router } from "express";

export const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
