import { z } from "zod";

export const communicationSchema = z
  .object({
    electricity: z.boolean({
      required_error: "Please provide is there an electricity",
    }),
    water_supply: z.boolean({
      required_error: "Please provide is there a water supply",
    }),
    gas: z.boolean({ required_error: "Please provide is there a gas" }),
    sewerage: z.boolean({
      required_error: "Please provide is there a sewerage",
    }),
  })
  .required();

export type CommunicationDto = z.infer<typeof communicationSchema>;
