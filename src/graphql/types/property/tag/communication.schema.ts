import { Field, ObjectType } from "@nestjs/graphql";
import { CommunicationEntity } from "src/typeorm/entities/property/tags/communication.entity";

@ObjectType()
export class CommunicationSchema implements Omit<CommunicationEntity, "id"> {
  @Field()
  electricity: boolean;

  @Field()
  water_supply: boolean;

  @Field()
  gas: boolean;

  @Field()
  sewerage: boolean;
}
