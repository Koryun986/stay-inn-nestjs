import { addressSchema } from "src/property/dto/address.dto";
import { z } from "zod";
import { flatTagSchema } from "./flat-tag.dto";

export const createRentFlatSchema = z
  .object({
    price: z.number({ required_error: "Price is required" }).positive(),
    currency: z.string({ required_error: "Currency is required" }).nonempty(),
    description: z
      .string({ required_error: "Description is required" })
      .nonempty(),
    address: addressSchema,
    flat_tag: flatTagSchema,
  })
  .required();

export type CreateRentFlatDto = z.infer<typeof createRentFlatSchema>;
