import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentFlatEntity } from "src/typeorm/entities/property/rent-flat.entity";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { RentFlatResolver } from "./resolvers/rent-flat.resolver";
import { AddressEntity } from "src/typeorm/entities/property/address.entity";
import { AvatarEntity } from "src/typeorm/entities/avatar.entity";
import { FlatTagResolver } from "./resolvers/tag/flat-tag.resolver";
import { RentHouseResolver } from "./resolvers/rent-house.resolver";
import { RentHouseEntity } from "src/typeorm/entities/property/rent-house.entity";
import { HouseTagEntity } from "src/typeorm/entities/property/tags/house-tag.entity";
import { AmenitiesEntity } from "src/typeorm/entities/property/tags/amenities.entity";
import { CommunicationEntity } from "src/typeorm/entities/property/tags/communication.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AvatarEntity,
      RentFlatEntity,
      FlatTagEntity,
      HouseholdApplicancesEntity,
      AddressEntity,
      RentHouseEntity,
      HouseTagEntity,
      AmenitiesEntity,
      CommunicationEntity,
    ]),
  ],
  providers: [RentFlatResolver, FlatTagResolver, RentHouseResolver],
})
export class GraphQLResolverModule {}
