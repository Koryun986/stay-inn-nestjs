import { Module } from "@nestjs/common";
import { RentHouseService } from "./service/rent-house.service";
import { RentHouseController } from "./controller/rent-house.controller";
import { JwtServiceModule } from "src/jwt-service/jwt-service.module";
import { HouseTag } from "src/typeorm/entities/property/tags/house-tag.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudStorageModule } from "src/cloud-storage/cloud-storage.module";
import { Address } from "src/typeorm/entities/property/address.entity";
import { RentHouseImage } from "src/typeorm/entities/property/images/rent-house-image.entity";
import { RentHouse } from "src/typeorm/entities/property/rent-house.entity";
import { HouseholdApplicances } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { Amenities } from "src/typeorm/entities/property/tags/amenities.entity";
import { Communication } from "src/typeorm/entities/property/tags/communication.entity";
import { TransactionService } from "src/database-transaction/transaction.service";

@Module({
  imports: [
    JwtServiceModule,
    TypeOrmModule.forFeature([
      RentHouse,
      Address,
      HouseTag,
      HouseholdApplicances,
      Amenities,
      Communication,
      RentHouseImage,
    ]),
    CloudStorageModule,
  ],
  controllers: [RentHouseController],
  providers: [RentHouseService, TransactionService],
})
export class RentHouseModule {}
