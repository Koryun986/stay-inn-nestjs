import { Module } from "@nestjs/common";
import { RentFlatController } from "./controller/rent-flat.controller";
import { RentFlatService } from "./services/rent-flat.service";

@Module({
  controllers: [RentFlatController],
  providers: [RentFlatService],
})
export class RentFlatModule {}
