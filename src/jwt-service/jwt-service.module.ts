import { Module } from "@nestjs/common";
import { JwtTokenService } from "./service/jwt.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConfig } from "./jwt-service.config";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TokenEntity } from "src/typeorm/entities/token.entity";

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtConfig,
    }),
    TypeOrmModule.forFeature([TokenEntity]),
  ],
  exports: [JwtTokenService],
  providers: [ConfigService, JwtTokenService],
})
export class JwtServiceModule {}
