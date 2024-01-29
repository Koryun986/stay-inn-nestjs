import { Injectable } from "@nestjs/common";
import { CreateRentHouseDto } from "../dto/create-rent-house.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RentHouse } from "src/typeorm/entities/property/rent-house.entity";
import { Repository } from "typeorm";
import { Address } from "src/typeorm/entities/property/address.entity";
import { HouseTag } from "src/typeorm/entities/property/tags/house-tag.entity";
import { HouseholdApplicances } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { Amenities } from "src/typeorm/entities/property/tags/amenities.entity";
import { Communication } from "src/typeorm/entities/property/tags/communication.entity";
import { RentHouseImage } from "src/typeorm/entities/property/images/rent-house-image.entity";
import { CloudStorageService } from "src/cloud-storage/services/cloud-storage.service";
import { TransactionService } from "src/database-transaction/transaction.service";
import { CommunicationDto } from "src/property/dto/communication.dto";
import { AmenititesDto } from "src/property/dto/amenities.dto";
import { HouseholdAppliancesDto } from "src/property/dto/household-appliances.dto";
import { HouseTagDto } from "../dto/house-tag.dto";

@Injectable()
export class RentHouseService {
  constructor(
    @InjectRepository(RentHouse)
    private readonly rentHouseRepository: Repository<RentHouse>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(HouseTag)
    private readonly houseTagRepository: Repository<HouseTag>,
    @InjectRepository(HouseholdApplicances)
    private readonly householdAppliancesRepository: Repository<HouseholdApplicances>,
    @InjectRepository(Amenities)
    private readonly amenitiesRepository: Repository<Amenities>,
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
    @InjectRepository(RentHouseImage)
    private readonly rentHouseImageRepository: Repository<RentHouseImage>,

    private readonly transactionService: TransactionService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async createRentHouse(
    images: Array<Express.Multer.File>,
    createRentHouseDto: CreateRentHouseDto,
    userId: number,
  ) {
    try {
      return this.transactionService.transaction(async (queryRunner) => {
        const communication = await queryRunner.manager.save(
          this.createCommunicationEntity(
            createRentHouseDto.house_tag.communication,
          ),
        );
        const amenities = await queryRunner.manager.save(
          this.createAmenitiesEntity(createRentHouseDto.house_tag.amenitites),
        );
        const householdApplicanes = await queryRunner.manager.save(
          this.createHouseholdAppliancesEntity(
            createRentHouseDto.house_tag.household_appliances,
          ),
        );
        const houseTag = await queryRunner.manager.save(
          this.createHouseTagEntity(
            createRentHouseDto.house_tag,
            householdApplicanes.id,
            amenities.id,
            communication.id,
          ),
        );
        const rentHouse = await queryRunner.manager.save(
          this.createRentHouseEntity(createRentHouseDto, houseTag.id),
        );
        queryRunner.commitTransaction();
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  createCommunicationEntity(communication: CommunicationDto) {
    return this.communicationRepository.create(communication);
  }

  createAmenitiesEntity(amenities: AmenititesDto) {
    return this.amenitiesRepository.create(amenities);
  }

  createHouseholdAppliancesEntity(householdApplicanes: HouseholdAppliancesDto) {
    return this.householdAppliancesRepository.create(householdApplicanes);
  }

  createHouseTagEntity(
    houseTag: HouseTagDto,
    householdApplicanesId: number,
    amenitiesId: number,
    communicationId: number,
  ) {
    return this.houseTagRepository.create({
      ...houseTag,
      household_appliances_id: householdApplicanesId,
      amenities_id: amenitiesId,
      communication_id: communicationId,
    });
  }

  createRentHouseEntity(rentHouse: CreateRentHouseDto, houseTagId: number) {
    return this.rentHouseRepository.create({
      ...rentHouse,
      house_tag_id: houseTagId,
    });
  }

  createRentHouseImageEntity(image: string, rentHouseId: number) {
    return this.rentHouseImageRepository.create({
      image_url: image,
      rent_house_id: rentHouseId,
    });
  }
}
