import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRentFlatDto } from "../dto/create-rent-flat.dto";
import { RentFlat } from "src/typeorm/entities/property/rent-flat.entity";
import { Repository } from "typeorm";
import { AddressDto } from "src/property/dto/address.dto";
import { Address } from "src/typeorm/entities/property/address.entity";
import { HouseholdApplicances } from "src/typeorm/entities/property/tags/household-appliances.entity";
import { HouseholdAppliancesDto } from "src/property/dto/household-appliances.dto";
import { TransactionService } from "src/database-transaction/transaction.service";
import { CloudStorageService } from "src/cloud-storage/services/cloud-storage.service";

@Injectable()
export class RentFlatService {
  constructor(
    @InjectRepository(RentFlat)
    private readonly rentFlatRepository: Repository<RentFlat>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(HouseholdApplicances)
    private readonly householdApplicancesRepository: Repository<HouseholdApplicances>,
    private readonly transactionService: TransactionService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async createRentFlat(
    images: Array<Express.Multer.File>,
    createRentFlatDto: CreateRentFlatDto,
    userId: number,
  ) {
    this.transactionService.transaction(async (queryRunner) => {
      const address = await queryRunner.manager.save(
        this.createAddressEntity(createRentFlatDto.address),
      );
      const householdApplicances = await queryRunner.manager.save(
        this.createHouseholdApplicancesEntity(
          createRentFlatDto.household_appliances,
        ),
      );
      const rentFlat = await queryRunner.manager.save(
        this.createRentFlatEntity(
          createRentFlatDto,
          userId,
          address.id,
          householdApplicances.id,
        ),
      );
      const imageUrls = await this.cloudStorageService.uploadRentFlatImages(
        images,
        userId,
        rentFlat.id,
      );
      queryRunner.commitTransaction();
    });
  }

  createAddressEntity(addressDto: AddressDto) {
    return this.addressRepository.create(addressDto);
  }

  createHouseholdApplicancesEntity(
    householdApplicancesDto: HouseholdAppliancesDto,
  ) {
    return this.householdApplicancesRepository.create(householdApplicancesDto);
  }

  createRentFlatEntity(
    createRentFlatDto: CreateRentFlatDto,
    userId: number,
    addressId: number,
    householdAppliancesId: number,
  ) {
    return this.rentFlatRepository.create({
      price: createRentFlatDto.price,
      currency: createRentFlatDto.currency,
      description: createRentFlatDto.description,
      user_id: userId,
      address_id: addressId,
      household_appliances_id: householdAppliancesId,
    });
  }
}
