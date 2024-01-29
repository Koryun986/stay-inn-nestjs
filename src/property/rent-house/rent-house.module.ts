import { Module } from "@nestjs/common";
import { RentHouseService } from "./service/rent-house.service";
import { RentHouseController } from "./controller/rent-house.controller";

@Module({
  controllers: [RentHouseController],
  providers: [RentHouseService],
})
export class RentHouseModule {}
