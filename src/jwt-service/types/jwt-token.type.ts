import { TokenEntity } from "src/typeorm/entities/token.entity";

export type JwtTokens = {
  accessToken: string;
  refreshToken: TokenEntity;
};
