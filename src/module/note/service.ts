import { ErrorResponse, response } from "../utils";
import { noteRepository } from "./repository";
import type { Note } from "./schema";
import { idSchema, noteSchema, noteUpdateSchema } from "./validation";

class NoteService {
  async create(data: Note) {
    const { title, content, } = data;
    const validate = await noteSchema.safeParseAsync({
      title,
      content,
    });

    if (!validate.success) {
      const errors = validate.error.issues;

      const errorMessages = errors.map((issue) => {
        const field = issue.path.join(".");
        return `${field}: ${issue.message}`;
      });
      throw new ErrorResponse(400, errorMessages.join(", "));
    }
    const existing = await noteRepository.getNoteByTitle(title!, data.userId);
    if (existing) throw new ErrorResponse(400, "Note with this title exists");

    const date = new Date().toLocaleDateString();

    const note = await noteRepository.create({
      ...data,
      createdAt: date,
      updatedAt: date,
    });
    if (!note) throw new ErrorResponse(500, "Something went wrong. Try again");
    return response(201, "Note created", note);
  }

  async getUserNotes(userId: string) {
    const notes = await noteRepository.getUserNotes(userId);
    return response(200, "Notes fetched", notes);
  }

  async getNoteById(id: string, userId: string) {
    const validate = idSchema.safeParse({ id });
    if (!validate.success) {
      const error = validate.error;
      if (error) {
        throw new ErrorResponse(400, error.message);
      } else {
        throw new ErrorResponse(400, "Unknown validation error");
      }
    }
    const note = await noteRepository.getNoteById(id, userId);
    if (!note) throw new ErrorResponse(404, "Note not found");
    return response(200, "Note fetched", note);
  }

  async update(id: string, userId: string, data: Partial<Note>) {
    const validate = await noteUpdateSchema.safeParseAsync({ id, ...data });
    if (!validate.success) {
      const errors = validate.error.issues;
      const errorMessages = errors.map((issue) => {
        const field = issue.path.join(".");
        return `${field}: ${issue.message}`;
      });
      throw new ErrorResponse(400, errorMessages.join(", "));
    }

    const existing = await noteRepository.getNoteByTitle(data.title!, userId);
    const notSameNote = existing?.id !== id;
    if (notSameNote)
      throw new ErrorResponse(400, "Note with this title exists");

    const note = await noteRepository.update(id, userId, data);
    if (!note) throw new ErrorResponse(404, "Note not found");
    return response(200, "Note updated", note);
  }

  async delete(id: string, userId: string) {
    const validate = idSchema.safeParse({ id });
    if (!validate.success) {
      const error = validate.error;
      if (error) {
        throw new ErrorResponse(400, error.message);
      } else {
        throw new ErrorResponse(400, "Unknown validation error");
      }
    }
    const note = await noteRepository.delete(id, userId);
    if (!note) throw new ErrorResponse(404, "Note not found");
    return response(204, "Note deleted", note);
  }
}

export const noteService = new NoteService();
