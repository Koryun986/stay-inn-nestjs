import { RentFlat } from "src/typeorm/entities/property/rent-flat.entity";
import { User } from "src/typeorm/entities/user.entity";

export type CreateRentFlatServiceReturn = RentFlat & string;

export type CreateRentFlatControllerReturn = CreateRentFlatServiceReturn & {
  user: User & string;
};
