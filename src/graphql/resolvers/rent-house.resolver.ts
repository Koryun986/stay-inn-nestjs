import { RentHouseSchema } from "../types/property/rent-house.schema";
import { RentHouseEntity } from "src/typeorm/entities/property/rent-house.entity";
import { ResolveField, Parent, Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AvatarEntity } from "src/typeorm/entities/avatar.entity";
import { AddressEntity } from "src/typeorm/entities/property/address.entity";
import { HouseTagEntity } from "src/typeorm/entities/property/tags/house-tag.entity";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { Repository } from "typeorm";
import { UserSchema } from "../types/auth/user.schema";
import { AddressSchema } from "../types/property/address.schema";
import { RentFlatSchema } from "../types/property/rent-flat.schema";
import { HouseTagSchema } from "../types/property/tag/house-tag.schema";

@Resolver(() => RentHouseSchema)
export class RentHouseResolver {
  constructor(
    @InjectRepository(RentHouseEntity)
    private readonly rentHouseRepository: Repository<RentHouseEntity>,
    @InjectRepository(HouseTagEntity)
    private readonly houseTagRepository: Repository<HouseTagEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  @Query(() => [RentHouseSchema])
  async getRentHouses() {
    const rentFlats = await this.rentHouseRepository.find();
    return rentFlats ? rentFlats : [];
  }

  @ResolveField("user", () => UserSchema)
  async getUser(@Parent() rentHouse: RentHouseSchema): Promise<UserSchema> {
    const { user_id } = await this.getRentHouseEntityFromSchema(rentHouse);
    const user = await this.userRepository.findOneBy({ id: user_id });
    const avatar = await this.avatarRepository.findOneBy({ user_id: user.id });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar_url: avatar.avatar_url,
    };
  }

  @ResolveField("address", () => AddressSchema)
  async getAddress(
    @Parent() rentHouse: RentHouseSchema,
  ): Promise<AddressSchema> {
    const { address_id } = await this.getRentHouseEntityFromSchema(rentHouse);
    const { country, city, building, street } =
      await this.addressRepository.findOneBy({ id: address_id });
    return {
      country,
      city,
      street,
      building,
    };
  }

  @ResolveField("flat_tag", () => HouseTagSchema)
  async getHouseTag(
    @Parent() rentHouse: RentHouseSchema,
  ): Promise<HouseTagSchema> {
    const { house_tag_id } = await this.getRentHouseEntityFromSchema(rentHouse);
    return await this.houseTagRepository.findOneBy({ id: house_tag_id });
  }

  private async getRentHouseEntityFromSchema(rentHouseSchema: RentHouseSchema) {
    return await this.rentHouseRepository.findOneBy({ id: rentHouseSchema.id });
  }
}
