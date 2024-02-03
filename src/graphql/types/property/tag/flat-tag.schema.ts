import {
  Field,
  Float,
  Int,
  ObjectType,
  registerEnumType,
} from "@nestjs/graphql";
import {
  FurnitureEnum,
  RepairEnum,
} from "src/typeorm/entities/property/tags/enum/tag.enum";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";
import {
  Furniture,
  Repair,
} from "src/typeorm/entities/property/tags/types/tag.type";
import { HouseholdAppliancesSchema } from "./household-appliances.schema";

registerEnumType(FurnitureEnum, {
  name: "Furniture",
});

registerEnumType(RepairEnum, {
  name: "Repair",
});

@ObjectType()
export class FlatTagSchema
  implements
    Omit<FlatTagEntity, "household_appliances_id" | "household_appliances">
{
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  area?: number;

  @Field((type) => Int)
  floor: number;

  @Field((type) => Int)
  rooms: number;

  @Field((type) => Float, { nullable: true })
  ceiling_height?: number;

  @Field((type) => Int)
  bathrooms: number;

  @Field((type) => Int)
  balconies: number;

  @Field((type) => FurnitureEnum)
  furniture: Furniture;

  @Field((type) => RepairEnum)
  repair: Repair;

  @Field()
  elevator: boolean;

  @Field((type) => HouseholdAppliancesSchema)
  household_appliances: HouseholdAppliancesSchema;
}
