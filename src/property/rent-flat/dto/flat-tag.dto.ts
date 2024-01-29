import { householdAppliancesSchema } from "src/property/dto/household-appliances.dto";
import {
  FurnitureEnum,
  RepairEnum,
} from "src/typeorm/entities/property/tags/enum/tag.enum";
import { z } from "zod";

export const flatTagSchema = z
  .object({
    area: z.number().positive().optional(),
    floor: z.number().positive(),
    rooms: z.number().positive(),
    ceiling_height: z.number().positive().optional(),
    bathrooms: z.number().positive(),
    balconies: z.number().positive(),
    furniture: z.enum([
      FurnitureEnum.Exist,
      FurnitureEnum.NotExist,
      FurnitureEnum.PartialFurniture,
      FurnitureEnum.ByAgreement,
    ]),
    repair: z.enum([
      RepairEnum.OldRepair,
      RepairEnum.PartialRepair,
      RepairEnum.CosmeticRepair,
      RepairEnum.EuroRenovated,
      RepairEnum.DesignerStyle,
      RepairEnum.Reconstructed,
    ]),
    elevator: z.boolean({
      required_error: "Please mention is in your building an elevator?",
    }),
    household_appliances: householdAppliancesSchema,
  })
  .required();

export type FlatTagDto = z.infer<typeof flatTagSchema>;
