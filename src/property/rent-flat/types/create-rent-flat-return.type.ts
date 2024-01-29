import { UserDto } from "src/auth/dto/user.dto";
import { RentFlat } from "src/typeorm/entities/property/rent-flat.entity";

export type CreateRentFlatServiceReturn = RentFlat & { images: string[] };

export type CreateRentFlatControllerReturn = CreateRentFlatServiceReturn & {
  user: UserDto;
};
