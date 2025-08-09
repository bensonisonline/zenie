import { Router } from "express";
import { noteController } from "./controller";
import { guard } from "@/middleware/guard";

export const noteRouter = Router();

noteRouter
  .use(guard)
  .post("/", noteController.create)
  .get("/", noteController.getUserNotes)
  .get("/:id", noteController.getNoteById)
  .put("/:id", noteController.update)
  .delete("/:id", noteController.delete);
