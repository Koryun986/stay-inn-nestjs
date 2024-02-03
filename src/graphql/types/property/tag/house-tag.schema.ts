import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import { AmenitiesEntity } from "src/typeorm/entities/property/tags/amenities.entity";
import { CommunicationEntity } from "src/typeorm/entities/property/tags/communication.entity";
import {
  BuildingTypeEnum,
  ConditionTypeEnum,
  FurnitureEnum,
  HouseTypeEnum,
  RepairEnum,
} from "src/typeorm/entities/property/tags/enum/tag.enum";
import { HouseTagEntity } from "src/typeorm/entities/property/tags/house-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import {
  HouseType,
  ConditionType,
  BuildingType,
  Furniture,
  Repair,
} from "src/typeorm/entities/property/tags/types/tag.type";
import { HouseholdAppliancesSchema } from "./household-appliances.schema";
import { AmenitiesSchema } from "./amenities.schema";
import { CommunicationSchema } from "./communication.schema";

registerEnumType(FurnitureEnum, {
  name: "Furniture",
});

registerEnumType(RepairEnum, {
  name: "Repair",
});

registerEnumType(HouseTypeEnum, {
  name: "HouseType",
});

registerEnumType(BuildingTypeEnum, {
  name: "BuildingType",
});

registerEnumType(ConditionTypeEnum, {
  name: "ConditionType",
});

@ObjectType()
export class HouseTagSchema
  implements
    Omit<
      HouseTagEntity,
      | "household_appliances_id"
      | "household_appliances"
      | "communication_id"
      | "communication"
      | "amenities_id"
      | "amenities"
    >
{
  @Field(() => Int)
  id: number;

  @Field(() => HouseTypeEnum)
  type: HouseType;

  @Field(() => ConditionTypeEnum)
  condition: ConditionType;

  @Field(() => BuildingTypeEnum)
  building_type: BuildingType;

  @Field(() => Float, { nullable: true })
  land_area?: number;

  @Field({ nullable: true })
  area?: number;

  @Field(() => Int)
  floors: number;

  @Field(() => Int)
  rooms: number;

  @Field(() => Float, { nullable: true })
  ceiling_height?: number;

  @Field(() => Int)
  bathrooms: number;

  @Field(() => Int)
  balconies: number;

  @Field(() => FurnitureEnum)
  furniture: Furniture;

  @Field(() => RepairEnum)
  repair: Repair;

  @Field(() => Int)
  garage: number;

  @Field(() => HouseholdAppliancesSchema)
  household_appliances: HouseholdAppliancesSchema;

  @Field(() => AmenitiesSchema)
  amenities: AmenitiesSchema;

  @Field(() => CommunicationSchema)
  communication: CommunicationSchema;
}
