import { ApolloDriverConfig } from "@nestjs/apollo";
import { Injectable } from "@nestjs/common";
import { GqlOptionsFactory } from "@nestjs/graphql";
import { join } from "path";

@Injectable()
export class GraphQLConfigService implements GqlOptionsFactory {
  createGqlOptions(): ApolloDriverConfig {
    return {
      typePaths: ["src/graphql/schema/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/graphql/types/index.ts"),
      },
    };
  }
}
