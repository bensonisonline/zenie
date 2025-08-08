import { eq } from "drizzle-orm";
import type { User } from "./schema";
import { user } from "./schema";
import { db } from "@/config/db";

class UserRepository {
  async create(data: User): Promise<User | undefined> {
    const [result] = await db.insert(user).values(data).returning();
    return result;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [result] = await db.select().from(user).where(eq(user.email, email));
    return result ?? null;
  }

  async getUserById(id: string): Promise<User | null> {
    const [result] = await db.select().from(user).where(eq(user.id, id));
    return result ?? null;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const [result] = await db
      .update(user)
      .set(data)
      .where(eq(user.id, id))
      .returning();
    return result ?? null;
  }

  async delete(id: string): Promise<User | null> {
    const [result] = await db.delete(user).where(eq(user.id, id)).returning();
    return result ?? null;
  }
}

export const userRepository = new UserRepository();
