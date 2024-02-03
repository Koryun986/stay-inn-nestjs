import { Field, ObjectType } from "@nestjs/graphql";
import { AmenitiesEntity } from "src/typeorm/entities/property/tags/amenities.entity";

@ObjectType()
export class AmenitiesSchema implements Omit<AmenitiesEntity, "id"> {
  @Field()
  swimming_pool: boolean;

  @Field()
  sauna: boolean;

  @Field()
  fireplace: boolean;

  @Field()
  barbecue_oven: boolean;

  @Field()
  security_system: boolean;
}
