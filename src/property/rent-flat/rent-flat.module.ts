import { Module } from "@nestjs/common";
import { RentFlatController } from "./controller/rent-flat.controller";
import { RentFlatService } from "./services/rent-flat.service";
import { JwtServiceModule } from "src/jwt-service/jwt-service.module";

@Module({
  imports: [JwtServiceModule],
  controllers: [RentFlatController],
  providers: [RentFlatService],
})
export class RentFlatModule {}
