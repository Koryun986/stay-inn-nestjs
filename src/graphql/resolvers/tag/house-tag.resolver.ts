import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AmenitiesSchema } from "src/graphql/types/property/tag/amenities.schema";
import { CommunicationSchema } from "src/graphql/types/property/tag/communication.schema";
import { HouseTagSchema } from "src/graphql/types/property/tag/house-tag.schema";
import { HouseholdAppliancesSchema } from "src/graphql/types/property/tag/household-appliances.schema";
import { AmenitiesEntity } from "src/typeorm/entities/property/tags/amenities.entity";
import { CommunicationEntity } from "src/typeorm/entities/property/tags/communication.entity";
import { HouseTagEntity } from "src/typeorm/entities/property/tags/house-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { Repository } from "typeorm";

@Resolver(() => HouseTagSchema)
export class HouseTagResolver {
  constructor(
    @InjectRepository(HouseTagEntity)
    private readonly houseTagRepository: Repository<HouseTagEntity>,
    @InjectRepository(HouseholdApplicancesEntity)
    private readonly householdAppliancesRepository: Repository<HouseholdApplicancesEntity>,
    @InjectRepository(AmenitiesEntity)
    private readonly amenitiesRepository: Repository<AmenitiesEntity>,
    @InjectRepository(CommunicationEntity)
    private readonly communicationRepository: Repository<CommunicationEntity>,
  ) {}

  @ResolveField("household_appliances", () => HouseholdAppliancesSchema)
  async getHouseholdAppliances(
    @Parent() houseTag: HouseTagSchema,
  ): Promise<HouseholdAppliancesSchema> {
    const { household_appliances_id } = await this.houseTagRepository.findOneBy(
      {
        id: houseTag.id,
      },
    );
    return await this.householdAppliancesRepository.findOneBy({
      id: household_appliances_id,
    });
  }

  @ResolveField("communication", () => CommunicationSchema)
  async getCommunication(
    @Parent() houseTag: HouseTagSchema,
  ): Promise<CommunicationSchema> {
    const { communication_id } = await this.houseTagRepository.findOneBy({
      id: houseTag.id,
    });
    return await this.communicationRepository.findOneBy({
      id: communication_id,
    });
  }

  @ResolveField("amenities", () => AmenitiesSchema)
  async getAmenities(
    @Parent() houseTag: HouseTagSchema,
  ): Promise<AmenitiesSchema> {
    const { amenities_id } = await this.houseTagRepository.findOneBy({
      id: houseTag.id,
    });
    return await this.amenitiesRepository.findOneBy({
      id: amenities_id,
    });
  }
}
