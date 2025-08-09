import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { primaryKey } from "../utils";

export const user = sqliteTable("users", {
  id: text().primaryKey().default(primaryKey()).unique().notNull(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: text().default(new Date().toLocaleDateString()),
  updatedAt: text().default(new Date().toLocaleDateString()),
});

export type User = typeof user.$inferSelect;
