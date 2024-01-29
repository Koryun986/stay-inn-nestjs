import { addressSchema } from "src/property/dto/address.dto";
import { z } from "zod";
import { houseTagSchema } from "./house-tag.dto";

export const createRentHouseSchema = z
  .object({
    price: z.number({ required_error: "Price is required" }).positive(),
    currency: z.string({ required_error: "Currency is required" }).nonempty(),
    description: z
      .string({ required_error: "Description is required" })
      .nonempty(),
    address: addressSchema,
    house_tag: houseTagSchema,
  })
  .required();

export type CreateRentHouseDto = z.infer<typeof createRentHouseSchema>;
