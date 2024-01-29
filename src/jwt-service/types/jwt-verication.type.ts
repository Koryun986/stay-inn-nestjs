import { UserDto } from "src/auth/dto/user.dto";

export type JwtVerificationResult = {
  payload: UserDto;
};
