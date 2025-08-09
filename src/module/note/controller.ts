import { noteService } from "./service";
import type { Request, Response } from "express";

class NoteController {
  async create(req: Request, res: Response) {
    const userId = req.user?.id;
    const note = await noteService.create({ ...req.body, userId: userId! });
    res.status(note.statusCode).send(note);
  }

  async getUserNotes(req: Request, res: Response) {
    const userId = req.user?.id;
    const notes = await noteService.getUserNotes(userId!);
    res.status(notes.statusCode).send(notes);
  }

  async getNoteById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const note = await noteService.getNoteById(id!, userId!);
    res.status(note.statusCode).send(note);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const note = await noteService.update(id!, userId!, req.body);
    res.status(note.statusCode).send(note);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    const note = await noteService.delete(id!, userId!);
    res.status(note.statusCode).send(note);
  }
}

export const noteController = new NoteController();
