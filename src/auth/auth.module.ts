import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { JwtServiceModule } from "src/jwt-service/jwt-service.module";
import { JwtService } from "@nestjs/jwt";
import { TokenEntity } from "src/typeorm/entities/token.entity";
import { ConfigService } from "@nestjs/config";
import { Avatar } from "src/typeorm/entities/avatar.entity";
import { TransactionService } from "src/database-transaction/transaction.service";
import { CloudStorageService } from "src/cloud-storage/services/cloud-storage.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TokenEntity, Avatar]),
    JwtServiceModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    ConfigService,
    TransactionService,
    CloudStorageService,
  ],
})
export class AuthModule {}
