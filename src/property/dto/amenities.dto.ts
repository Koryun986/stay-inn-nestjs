import { z } from "zod";

export const amenitiesSchema = z
  .object({
    swimming_pool: z.boolean({
      required_error: "Please mention is there a swimming pool",
    }),
    sauna: z.boolean({ required_error: "Please mention is there a sauna" }),
    fireplace: z.boolean({
      required_error: "Please mention is there a fireplace",
    }),
    barbecue_oven: z.boolean({
      required_error: "Please mention is there a barbecue oven",
    }),
    pavilion: z.boolean({
      required_error: "Please mention is there a pavilion",
    }),
    security_system: z.boolean({
      required_error: "Please mention is there a security system",
    }),
  })
  .required();

export type AmenititesDto = z.infer<typeof amenitiesSchema>;
