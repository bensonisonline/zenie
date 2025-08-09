import { id } from "zod/locales";
import z4 from "zod/v4";

export const noteSchema = z4.object({
  title: z4.string().min(3).max(50).trim(),
  content: z4.string().min(3),
});

export const noteUpdateSchema = z4.object({
  id: z4.uuid(),
  title: z4.string().min(3).max(50).trim().optional(),
  content: z4.string().min(3).optional(),
});

export const idSchema = z4.object({ id: z4.uuid() });
