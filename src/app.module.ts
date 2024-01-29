import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configuration from "config/configuration";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmConfigService } from "./typeorm/typeorm-config.service";
import { JwtServiceModule } from "./jwt-service/jwt-service.module";
import { CloudStorageModule } from "./cloud-storage/cloud-storage.module";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLConfigService } from "./graphql/graphql.config";
import { GraphQLResolverModule } from "./graphql/graphql.module";
import { RentFlatModule } from './property/rent-flat/rent-flat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env", ".database.env", ".jwt.env", ".firebase.env"],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
    }),
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   useClass: GraphQLConfigService,
    // }),
    AuthModule,
    JwtServiceModule,
    CloudStorageModule,
    GraphQLResolverModule,
    RentFlatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
