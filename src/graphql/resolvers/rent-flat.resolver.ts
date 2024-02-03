import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { RentFlatEntity } from "src/typeorm/entities/property/rent-flat.entity";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { Repository } from "typeorm";
import { RentFlatSchema } from "../types/property/rent-flat.schema";
import { AddressEntity } from "src/typeorm/entities/property/address.entity";
import { AvatarEntity } from "src/typeorm/entities/avatar.entity";
import { UserSchema } from "../types/auth/user.schema";
import { AddressSchema } from "../types/property/address.schema";
import { FlatTagSchema } from "../types/property/tag/flat-tag.schema";

@Resolver(() => RentFlatSchema)
export class RentFlatResolver {
  constructor(
    @InjectRepository(RentFlatEntity)
    private readonly rentFlatRepository: Repository<RentFlatEntity>,
    @InjectRepository(FlatTagEntity)
    private readonly flatTagRepository: Repository<FlatTagEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AvatarEntity)
    private readonly avatarRepository: Repository<AvatarEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  @Query(() => [RentFlatSchema])
  async getRentFlats() {
    const rentFlats = await this.rentFlatRepository.find();
    return rentFlats ? rentFlats : [];
  }

  @ResolveField("user", () => UserSchema)
  async getUser(@Parent() rentFlat: RentFlatSchema): Promise<UserSchema> {
    const { user_id } = await this.getRentFlatEntityFromSchema(rentFlat);
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
  async getAddress(@Parent() rentFlat: RentFlatSchema): Promise<AddressSchema> {
    const { address_id } = await this.getRentFlatEntityFromSchema(rentFlat);
    const { country, city, building, street } =
      await this.addressRepository.findOneBy({ id: address_id });
    return {
      country,
      city,
      street,
      building,
    };
  }

  @ResolveField("flat_tag", () => FlatTagSchema)
  async getFlatTag(@Parent() rentFlat: RentFlatSchema): Promise<FlatTagSchema> {
    const { flat_tag_id } = await this.getRentFlatEntityFromSchema(rentFlat);
    return await this.flatTagRepository.findOneBy({ id: flat_tag_id });
  }

  private async getRentFlatEntityFromSchema(rentFlatSchema: RentFlatSchema) {
    return await this.rentFlatRepository.findOneBy({ id: rentFlatSchema.id });
  }
}
