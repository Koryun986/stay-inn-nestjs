import { Field, Int, ObjectType } from "@nestjs/graphql";
import { RentFlatEntity } from "src/typeorm/entities/property/rent-flat.entity";
import { UserSchema } from "../auth/user.schema";
import { AddressSchema } from "./address.schema";
import { FlatTagSchema } from "./tag/flat-tag.schema";

@ObjectType()
export class RentFlatSchema
  implements
    Omit<
      RentFlatEntity,
      "user_id" | "flat_tag_id" | "address_id" | "user" | "address" | "flat_tag"
    >
{
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  price: number;

  @Field()
  currency: string;

  @Field()
  description: string;

  @Field((type) => UserSchema)
  user: UserSchema;

  @Field((type) => AddressSchema)
  address: AddressSchema;

  @Field((type) => FlatTagSchema)
  flat_tag: FlatTagSchema;

  @Field((type) => [String])
  images: string[];
}
