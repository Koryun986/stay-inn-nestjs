import { UserDto } from "src/auth/dto/user.dto";
import { CreateRentHouseDto } from "../dto/create-rent-house.dto";

export type CreateRentHouseServiceReturn = CreateRentHouseDto & {
  images: string[];
  id: number;
};

export type CreateRentHouseControllerReturn = CreateRentHouseServiceReturn & {
  user: UserDto;
};
