import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserDto } from "src/auth/dto/user.dto";

@ObjectType()
export class UserSchema implements UserDto {
  @Field((type) => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  avatar_url: string;
}
