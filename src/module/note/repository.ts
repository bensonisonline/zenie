import { note } from "./schema";
import { type Note } from "./schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

class NoteRepository {
  async getNoteByTitle(title: string, userId: string): Promise<Note | null> {
    const [result] = await db
      .select()
      .from(note)
      .where((eq(note.title, title), eq(note.userId, userId)));
    return result ?? null;
  }
  async create(data: Note): Promise<Note | undefined> {
    const [result] = await db.insert(note).values(data).returning();
    return result;
  }

  async getUserNotes(userId: string): Promise<Note[]> {
    const notes = await db.select().from(note).where(eq(note.userId, userId));
    return notes;
  }
  async getNoteById(id: string, userId: string): Promise<Note | null> {
    const [result] = await db
      .select()
      .from(note)
      .where((eq(note.id, id), eq(note.userId, userId)));
    return result ?? null;
  }

  async update(
    id: string,
    userId: string,
    data: Partial<Note>
  ): Promise<Note | null> {
    const [result] = await db
      .update(note)
      .set(data)
      .where((eq(note.id, id), eq(note.userId, userId)))
      .returning();
    return result ?? null;
  }

  async delete(id: string, userId: string): Promise<Note | null> {
    const [result] = await db
      .delete(note)
      .where((eq(note.id, id), eq(note.userId, userId)))
      .returning();
    return result ?? null;
  }
}

export const noteRepository = new NoteRepository();
