import { sqliteTable, text, uniqueIndex, index } from "drizzle-orm/sqlite-core";
import { primaryKey } from "../utils";
import { sql } from "drizzle-orm";

export const user = sqliteTable(
  "users",
  {
    id: text()
      .primaryKey()
      .notNull()
      .$defaultFn(() => primaryKey()),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    createdAt: text().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("userId_idx").on(table.id),
    uniqueIndex("email_idx").on(table.email),
  ]
);

export type User = typeof user.$inferSelect;