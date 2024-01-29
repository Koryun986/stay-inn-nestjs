import { z } from "zod";

export const addressSchema = z
  .object({
    country: z.string({ required_error: "Country is required" }).nonempty(),
    city: z.string({ required_error: "City is required" }).nonempty(),
    street: z.string({ required_error: "Street is required" }).nonempty(),
    building: z.string({ required_error: "Building is required" }).nonempty(),
  })
  .required();

export type AddressDto = z.infer<typeof addressSchema>;
