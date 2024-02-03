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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      AvatarEntity,
      RentFlatEntity,
      FlatTagEntity,
      HouseholdApplicancesEntity,
      AddressEntity,
    ]),
  ],
  providers: [RentFlatResolver, FlatTagResolver],
})
export class GraphQLResolverModule {}
