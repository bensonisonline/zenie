import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  casing: "snake_case",
  schema: ["./src/module/user/schema.ts", "./src/module/note/schema.ts"],
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
