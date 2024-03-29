import { Module } from "@nestjs/common";
import { RentFlatController } from "./controller/rent-flat.controller";
import { RentFlatService } from "./services/rent-flat.service";
import { JwtServiceModule } from "src/jwt-service/jwt-service.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentFlatEntity } from "src/typeorm/entities/property/rent-flat.entity";
import { AddressEntity } from "src/typeorm/entities/property/address.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { TransactionService } from "src/database-transaction/transaction.service";
import { CloudStorageModule } from "src/cloud-storage/cloud-storage.module";
import { RentFlatImageEntity } from "src/typeorm/entities/property/images/rent-flat-image.entity";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";

@Module({
  imports: [
    JwtServiceModule,
    TypeOrmModule.forFeature([
      RentFlatEntity,
      AddressEntity,
      FlatTagEntity,
      HouseholdApplicancesEntity,
      RentFlatImageEntity,
    ]),
    CloudStorageModule,
  ],
  controllers: [RentFlatController],
  providers: [RentFlatService, TransactionService],
})
export class RentFlatModule {}
