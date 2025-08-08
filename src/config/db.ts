import "dotenv/config";
import { drizzle } from "drizzle-orm/bun-sqlite";

export const db = drizzle({connection: process.env.DB_FILE_NAME!});
