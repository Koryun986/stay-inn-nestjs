import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { TokenEntity } from "./entities/token.entity";
import { AddressEntity } from "./entities/property/address.entity";
import { AvatarEntity } from "./entities/avatar.entity";
import { RentFlatEntity } from "./entities/property/rent-flat.entity";
import { RentHouseEntity } from "./entities/property/rent-house.entity";
import { FlatTagEntity } from "./entities/property/tags/flat-tag.entity";
import { HouseTagEntity } from "./entities/property/tags/house-tag.entity";
import { CommunicationEntity } from "./entities/property/tags/communication.entity";
import { AmenitiesEntity } from "./entities/property/tags/amenities.entity";
import { HouseholdApplicancesEntity } from "./entities/property/tags/household-appliances.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get("database.host"),
      port: this.configService.get("database.port"),
      username: this.configService.get("database.user"),
      password: this.configService.get<string>("database.password"),
      database: this.configService.get("database.name"),
      entities: [
        UserEntity,
        TokenEntity,
        AvatarEntity,
        AddressEntity,
        RentFlatEntity,
        RentHouseEntity,
        HouseholdApplicancesEntity,
        FlatTagEntity,
        HouseTagEntity,
        CommunicationEntity,
        AmenitiesEntity,
      ],
      synchronize: this.configService.get<string>("env") !== "production",
    };
  }
}
