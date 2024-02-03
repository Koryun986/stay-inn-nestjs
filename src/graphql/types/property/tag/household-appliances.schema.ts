import { Field, ObjectType } from "@nestjs/graphql";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";

@ObjectType()
export class HouseholdAppliancesSchema
  implements Omit<HouseholdApplicancesEntity, "id">
{
  @Field()
  stove: boolean;

  @Field()
  air_conditioner: boolean;

  @Field()
  refrigerator: boolean;

  @Field()
  dishwasher: boolean;

  @Field()
  washing_machine: boolean;

  @Field()
  tumble_dryer: boolean;
}
