import { z } from "zod";
import { loginUserSchema } from "./login-user.dto";

export const createUserSchema = loginUserSchema.extend({
  name: z.string().nonempty("Name is required"),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
