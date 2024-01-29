import { Controller } from "@nestjs/common";
import { RentHouseService } from "../service/rent-house.service";

@Controller("rent-house")
export class RentHouseController {
  constructor(private readonly rentHouseService: RentHouseService) {}
}
