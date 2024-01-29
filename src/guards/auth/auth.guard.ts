import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { UserDto } from "src/auth/dto/user.dto";
import { JwtTokenService } from "src/jwt-service/service/jwt.service";
import { AuthUtils } from "src/utils/auth/auth.utils";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtTokenService: JwtTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();
      const accessToken = AuthUtils.getAccessTokenFromRequest(request);
      const userDto: UserDto =
        await this.jwtTokenService.validateAccessToken(accessToken);
      return !!userDto;
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }
}
