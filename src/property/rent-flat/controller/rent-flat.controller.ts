import { Controller } from "@nestjs/common";
import { RentFlatService } from "../services/rent-flat.service";

@Controller("rent-flat")
export class RentFlatController {
  constructor(private readonly rentFlatService: RentFlatService) {}
}
