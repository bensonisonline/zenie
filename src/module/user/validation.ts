import z from "zod";

export const registerSchema = z.object({
  name: z
    .string("Name is required. Must be at least 3 characters")
    .min(3)
    .max(50)
    .trim()
    .toLowerCase(),
  email: z.email("Invalid email address").toLowerCase(),
  password: z
    .string("Invalid password format")
    .min(6, "Password must be at least 6 characters")
    .max(50)
    .trim(),
});

export const emailSchema = z.object({ email: z.email().toLowerCase() });

export const loginSchema = z.object({
  email: z.email().toLowerCase(),
  password: z.string().min(6).max(50).trim(),
});

export const updateSchema = z.object({
  name: z.string().min(3).max(50).trim().toLowerCase().optional(),
  email: z.email().toLowerCase().optional(),
});

export const idSchema = z.object({ id: z.uuidv4() });
