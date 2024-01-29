import { Module } from "@nestjs/common";
import { RentHouseService } from "./service/rent-house.service";
import { RentHouseController } from "./controller/rent-house.controller";
import { JwtServiceModule } from "src/jwt-service/jwt-service.module";

@Module({
  imports: [JwtServiceModule],
  controllers: [RentHouseController],
  providers: [RentHouseService],
})
export class RentHouseModule {}
