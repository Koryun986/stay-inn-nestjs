import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AddressSchema {
  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  street: string;

  @Field()
  building: string;
}
