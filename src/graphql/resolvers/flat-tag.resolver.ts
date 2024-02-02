import { Query, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { RentFlatEntity } from "src/typeorm/entities/property/rent-flat.entity";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { UserEntity } from "src/typeorm/entities/user.entity";
import { Repository } from "typeorm";
import { RentFlatSchema } from "../types/property/rent-flat.schema";

@Resolver((of) => RentFlatSchema)
export class RentFlatResolver {
  constructor(
    @InjectRepository(RentFlatEntity)
    private readonly rentFlatRepository: Repository<RentFlatEntity>,
    @InjectRepository(FlatTagEntity)
    private readonly flatTagRepository: Repository<FlatTagEntity>,
    @InjectRepository(HouseholdApplicancesEntity)
    private readonly householdApplicancesEntity: Repository<HouseholdApplicancesEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Query((returns) => [RentFlatSchema])
  async getRentFlats() {
    const data: RentFlatSchema[] = [
      {
        id: 1,
        price: 12,
        currency: "USD",
        description: "Good",
        address: {
          country: "USA",
          city: "LA",
          street: "somewhere",
          building: "9b",
        },
        user: {
          id: 3,
          email: "user@example.com",
          name: "user",
          avatar_url: "http://example.com",
        },
        images: ["https://www.example.com"],
        flat_tag: {
          area: 21,
          floor: 2,
          rooms: 1,
          ceiling_height: 233.1,
          bathrooms: 3,
          balconies: 1,
          elevator: false,
          furniture: "Exist",
          repair: "Old Repair",
          household_appliances: {
            stove: true,
            air_conditioner: true,
            refrigerator: true,
            dishwasher: true,
            washing_machine: true,
            tumble_dryer: true,
          },
        },
      },
    ];
    return data;
  }
}
