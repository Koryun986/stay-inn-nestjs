import { z } from "zod";

export const householdAppliancesSchema = z
  .object({
    stove: z.boolean({ required_error: "Please provide is there a stove" }),
    air_conditioner: z.boolean({
      required_error: "Please provide is there an air conditioner",
    }),
    refrigator: z.boolean({
      required_error: "Please provide is there a refrigator",
    }),
    dishwasher: z.boolean({
      required_error: "Please provide is there a dishwasher",
    }),
    washing_machine: z.boolean({
      required_error: "Please provide is there a washing machine",
    }),
    tumble_dryer: z.boolean({
      required_error: "Please provide is there a tumble dryer",
    }),
  })
  .required();

export type HouseholdAppliancesDto = z.infer<typeof householdAppliancesSchema>;
