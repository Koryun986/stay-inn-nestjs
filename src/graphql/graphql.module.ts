import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentFlatEntity } from "src/typeorm/entities/property/rent-flat.entity";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { RentFlatResolver } from "./resolvers/flat-tag.resolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      RentFlatEntity,
      FlatTagEntity,
      HouseholdApplicancesEntity,
    ]),
  ],
  providers: [RentFlatResolver],
})
export class GraphQLResolverModule {}
