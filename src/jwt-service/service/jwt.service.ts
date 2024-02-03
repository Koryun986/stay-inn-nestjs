import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { add, isFuture, isPast } from "date-fns";
import { UserDto } from "src/auth/dto/user.dto";
import { JwtTokens } from "src/jwt-service/types/jwt-token.type";
import { JwtVerificationResult } from "src/jwt-service/types/jwt-verication.type";
import { TokenEntity } from "src/typeorm/entities/token.entity";
import { Repository } from "typeorm";
import { v4 } from "uuid";

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
    private readonly configService: ConfigService,
  ) {}

  async generateTokens(payload: UserDto): Promise<JwtTokens> {
    console.log(payload);

    const accessToken = await this.gnenerateAccessToken(payload);
    const refreshToken = await this.generateRefreshToken(payload);
    console.log({
      accessToken,
      refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async gnenerateAccessToken(payload: UserDto) {
    return await this.jwtService.signAsync(
      { payload },
      {
        secret: this.configService.get("jwt.secret"),
        expiresIn: this.configService.get<string>("jwt.expiration"),
      },
    );
  }

  async validateRefreshToken(payload: UserDto) {
    const token = await this.getRefreshTokenFromUser(payload);
    if (isPast(Date.parse(token.expiration.toString()))) {
      token.expiration = this.createExpiration();
    }
    await this.tokenRepository.save(token);
    return token;
  }

  async getRefreshTokenFromUser(user: UserDto): Promise<TokenEntity> {
    return await this.tokenRepository.findOneBy({
      user_id: user.id,
    });
  }

  async isValideRefreshToken(token: TokenEntity): Promise<boolean> {
    return isFuture(Date.parse(token.expiration.toString()));
  }

  async validateAccessToken(token: string): Promise<UserDto> {
    try {
      const data: JwtVerificationResult = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get("jwt.secret"),
        },
      );
      return data.payload;
    } catch (err) {
      throw new UnauthorizedException("JWT is not valid");
    }
  }

  async isTokensBelongsToOneUser(
    accessToken: string,
    refreshToken: string,
  ): Promise<UserDto> {
    const userFromAccessToken = await this.validateAccessToken(accessToken);
    const userIdFromAccessToken = userFromAccessToken.id;
    const tokenFromRefreshToken = await this.tokenRepository.findOneBy({
      token: refreshToken,
    });
    const userIdFromRefreshToken = tokenFromRefreshToken.user_id;
    if (userIdFromAccessToken !== userIdFromRefreshToken)
      throw new BadRequestException("Please login to your account");

    return userFromAccessToken;
  }

  private async generateRefreshToken(payload: UserDto) {
    const token = this.tokenRepository.create({
      token: v4(),
      expiration: this.createExpiration(),
      user: payload,
    });
    return token;
  }

  private createExpiration() {
    return add(new Date(), { months: 1 });
  }
}
