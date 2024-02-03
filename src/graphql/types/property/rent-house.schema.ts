import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RentHouseEntity } from "src/typeorm/entities/property/rent-house.entity";
import { UserSchema } from "../auth/user.schema";
import { AddressSchema } from "./address.schema";
import { HouseTagSchema } from "./tag/house-tag.schema";

@ObjectType()
export class RentHouseSchema
  implements
    Omit<
      RentHouseEntity,
      | "user_id"
      | "address_id"
      | "house_tag_id"
      | "address"
      | "user"
      | "house_tag"
    >
{
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  price: number;

  @Field()
  currency: string;

  @Field()
  description: string;

  @Field(() => UserSchema)
  user: UserSchema;

  @Field(() => AddressSchema)
  address: AddressSchema;

  @Field(() => HouseTagSchema)
  house_tag: HouseTagSchema;

  @Field(() => [String])
  images: string[];
}
