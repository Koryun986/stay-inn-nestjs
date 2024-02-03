import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { FlatTagSchema } from "src/graphql/types/property/tag/flat-tag.schema";
import { HouseholdAppliancesSchema } from "src/graphql/types/property/tag/household-appliances.schema";
import { FlatTagEntity } from "src/typeorm/entities/property/tags/flat-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { Repository } from "typeorm";

@Resolver(() => FlatTagSchema)
export class FlatTagResolver {
  constructor(
    @InjectRepository(FlatTagEntity)
    private readonly flatTagRepository: Repository<FlatTagEntity>,
    @InjectRepository(HouseholdApplicancesEntity)
    private readonly householdAppliancesRepository: Repository<HouseholdApplicancesEntity>,
  ) {}

  @ResolveField("household_appliances", () => HouseholdAppliancesSchema)
  async getHouseholdAppliances(
    @Parent() flatTag: FlatTagSchema,
  ): Promise<HouseholdAppliancesSchema> {
    const { household_appliances_id } = await this.flatTagRepository.findOneBy({
      id: flatTag.id,
    });
    return await this.householdAppliancesRepository.findOneBy({
      id: household_appliances_id,
    });
  }
}
