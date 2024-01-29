import { UserDto } from "src/auth/dto/user.dto";
import { CreateRentFlatDto } from "../dto/create-rent-flat.dto";

export type CreateRentFlatServiceReturn = CreateRentFlatDto & {
  images: string[];
  id: number;
};

export type CreateRentFlatControllerReturn = CreateRentFlatServiceReturn & {
  user: UserDto;
};
