import { z } from "zod";

export const loginUserSchema = z
  .object({
    email: z.string().email("Please enter valid email address"),
    password: z.string().min(5, "Password must be at least 5 characters"),
  })
  .required();

export type LoginUserDto = z.infer<typeof loginUserSchema>;
