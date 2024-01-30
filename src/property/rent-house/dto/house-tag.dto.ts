import { amenitiesSchema } from "src/property/dto/amenities.dto";
import { communicationSchema } from "src/property/dto/communication.dto";
import { householdAppliancesSchema } from "src/property/dto/household-appliances.dto";
import {
  BuildingTypeEnum,
  ConditionTypeEnum,
  FurnitureEnum,
  HouseTypeEnum,
  RepairEnum,
} from "src/typeorm/entities/property/tags/enum/tag.enum";
import { z } from "zod";

export const houseTagSchema = z
  .object({
    type: z.enum([
      HouseTypeEnum.House,
      HouseTypeEnum.Townhouse,
      HouseTypeEnum.CountryHouse,
    ]),
    considtion: z.enum([
      ConditionTypeEnum.Constructed,
      ConditionTypeEnum.Unfinished,
    ]),
    building_type: z.enum([
      BuildingTypeEnum.Stone,
      BuildingTypeEnum.Panel,
      BuildingTypeEnum.Monolith,
      BuildingTypeEnum.Brick,
      BuildingTypeEnum.Cassette,
      BuildingTypeEnum.Wooden,
    ]),
    area: z.number().positive().optional(),
    land_area: z.number().positive().optional(),
    floors: z.number().positive(),
    rooms: z.number().positive(),
    ceiling_height: z.number().positive().optional(),
    bathrooms: z.number().positive(),
    garage: z.number().positive(),
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
    household_appliances: householdAppliancesSchema,
    amenitites: amenitiesSchema,
    communication: communicationSchema,
  })
  .required();

export type HouseTagDto = z.infer<typeof houseTagSchema>;
