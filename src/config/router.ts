import { noteRouter } from "@/module/note/router";
import { authRouter, userRouter } from "@/module/user/router";
import { Router } from "express";

export const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/note", noteRouter);
