import { text, sqliteTable, index, uniqueIndex } from "drizzle-orm/sqlite-core";
import { primaryKey } from "../utils";
import { sql } from "drizzle-orm/sql";

export const note = sqliteTable(
  "notes",
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => primaryKey()),
    userId: text().notNull(),
    title: text().notNull(),
    content: text().notNull(),
    createdAt: text().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("title_idx").on(table.title),
    uniqueIndex("userId_title_idx").on(table.userId, table.title),
  ]
);
export type Note = typeof note.$inferSelect;
