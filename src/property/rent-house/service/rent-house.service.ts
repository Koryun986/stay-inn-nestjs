import { Injectable } from "@nestjs/common";
import { CreateRentHouseDto } from "../dto/create-rent-house.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RentHouseEntity } from "src/typeorm/entities/property/rent-house.entity";
import { Repository } from "typeorm";
import { AddressEntity } from "src/typeorm/entities/property/address.entity";
import { HouseTagEntity } from "src/typeorm/entities/property/tags/house-tag.entity";
import { HouseholdApplicancesEntity } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { AmenitiesEntity } from "src/typeorm/entities/property/tags/amenities.entity";
import { CommunicationEntity } from "src/typeorm/entities/property/tags/communication.entity";
import { RentHouseImageEntity } from "src/typeorm/entities/property/images/rent-house-image.entity";
import { CloudStorageService } from "src/cloud-storage/services/cloud-storage.service";
import { TransactionService } from "src/database-transaction/transaction.service";
import { CommunicationDto } from "src/property/dto/communication.dto";
import { AmenititesDto } from "src/property/dto/amenities.dto";
import { HouseholdAppliancesDto } from "src/property/dto/household-appliances.dto";
import { HouseTagDto } from "../dto/house-tag.dto";
import { CreateRentHouseServiceReturn } from "../types/create-rent-house-return.type";

@Injectable()
export class RentHouseService {
  constructor(
    @InjectRepository(RentHouseEntity)
    private readonly rentHouseRepository: Repository<RentHouseEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    @InjectRepository(HouseTagEntity)
    private readonly houseTagRepository: Repository<HouseTagEntity>,
    @InjectRepository(HouseholdApplicancesEntity)
    private readonly householdAppliancesRepository: Repository<HouseholdApplicancesEntity>,
    @InjectRepository(AmenitiesEntity)
    private readonly amenitiesRepository: Repository<AmenitiesEntity>,
    @InjectRepository(CommunicationEntity)
    private readonly communicationRepository: Repository<CommunicationEntity>,
    @InjectRepository(RentHouseImageEntity)
    private readonly rentHouseImageRepository: Repository<RentHouseImageEntity>,

    private readonly transactionService: TransactionService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async createRentHouse(
    images: Array<Express.Multer.File>,
    createRentHouseDto: CreateRentHouseDto,
    userId: number,
  ): Promise<CreateRentHouseServiceReturn> {
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
        const imageUrls = await this.cloudStorageService.uploadRentHouseImages(
          images,
          userId,
          rentHouse.id,
        );
        await Promise.all(
          imageUrls.map(async (imageUrl) => {
            await queryRunner.manager.save(
              this.createRentHouseImageEntity(imageUrl, rentHouse.id),
            );
          }),
        );
        queryRunner.commitTransaction();
        return {
          ...createRentHouseDto,
          id: rentHouse.id,
          images: imageUrls,
        };
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
