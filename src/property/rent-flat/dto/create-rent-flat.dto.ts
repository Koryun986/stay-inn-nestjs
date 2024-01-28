import { addressSchema } from "src/property/dto/address.dto";
import { householdAppliancesSchema } from "src/property/dto/household-appliances.dto";
import { z } from "zod";

export const createRentFlatSchema = z
  .object({
    price: z.number({ required_error: "Price is required" }).positive(),
    currency: z.string({ required_error: "Currency is required" }).nonempty(),
    description: z
      .string({ required_error: "Description is required" })
      .nonempty(),
    address: addressSchema,
    household_appliances: householdAppliancesSchema,
  })
  .required();

export type CreateRentFlatDto = z.infer<typeof createRentFlatSchema>;
