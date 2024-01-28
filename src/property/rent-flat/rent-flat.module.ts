import { Module } from "@nestjs/common";
import { RentFlatController } from "./controller/rent-flat.controller";
import { RentFlatService } from "./services/rent-flat.service";
import { JwtServiceModule } from "src/jwt-service/jwt-service.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RentFlat } from "src/typeorm/entities/property/rent-flat.entity";
import { Address } from "src/typeorm/entities/property/address.entity";
import { HouseholdApplicances } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { TransactionService } from "src/database-transaction/transaction.service";
import { CloudStorageModule } from "src/cloud-storage/cloud-storage.module";

@Module({
  imports: [
    JwtServiceModule,
    TypeOrmModule.forFeature([RentFlat, Address, HouseholdApplicances]),
    CloudStorageModule,
  ],
  controllers: [RentFlatController],
  providers: [RentFlatService, TransactionService],
})
export class RentFlatModule {}
