import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { primaryKey } from "../utils";

const note = sqliteTable("notes", {
  id: text().default(primaryKey()).notNull().unique(),
  name: text(),
  content: text().notNull(),
  createdAt: integer(),
  updatedAt: integer(),
});

export type Note = typeof note.$inferSelect;
