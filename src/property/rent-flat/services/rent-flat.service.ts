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
import { RentFlatImage } from "src/typeorm/entities/property/images/rent-flat-image.entity";
import { CreateRentFlatServiceReturn } from "../types/create-rent-flat-return.type";
import { FlatTagDto } from "../dto/flat-tag.dto";
import { FlatTag } from "src/typeorm/entities/property/tags/flat-tag.entity";

@Injectable()
export class RentFlatService {
  constructor(
    @InjectRepository(RentFlat)
    private readonly rentFlatRepository: Repository<RentFlat>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(FlatTag)
    private readonly flatTagRepository: Repository<FlatTag>,
    @InjectRepository(HouseholdApplicances)
    private readonly householdApplicancesRepository: Repository<HouseholdApplicances>,
    @InjectRepository(RentFlatImage)
    private readonly rentFlatImageRepository: Repository<RentFlatImage>,
    private readonly transactionService: TransactionService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async createRentFlat(
    images: Array<Express.Multer.File>,
    createRentFlatDto: CreateRentFlatDto,
    userId: number,
  ): Promise<CreateRentFlatServiceReturn> {
    try {
      return this.transactionService.transaction(async (queryRunner) => {
        const address = await queryRunner.manager.save(
          this.createAddressEntity(createRentFlatDto.address),
        );
        const householdApplicances = await queryRunner.manager.save(
          this.createHouseholdApplicancesEntity(
            createRentFlatDto.flat_tag.household_appliances,
          ),
        );
        const flatTag = await queryRunner.manager.save(
          this.createFlatTagEntity(
            createRentFlatDto.flat_tag,
            householdApplicances.id,
          ),
        );
        const rentFlat = await queryRunner.manager.save(
          this.createRentFlatEntity(
            createRentFlatDto,
            userId,
            address.id,
            flatTag.id,
          ),
        );
        const imageUrls = await this.cloudStorageService.uploadRentFlatImages(
          images,
          userId,
          rentFlat.id,
        );
        await Promise.all(
          imageUrls.map(async (imageUrl) => {
            await queryRunner.manager.save(
              this.createRentFlatImage(imageUrl, rentFlat.id),
            );
          }),
        );
        queryRunner.commitTransaction();
        return {
          ...rentFlat,
          images: imageUrls,
        };
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  createAddressEntity(addressDto: AddressDto) {
    return this.addressRepository.create(addressDto);
  }

  createHouseholdApplicancesEntity(
    householdApplicancesDto: HouseholdAppliancesDto,
  ) {
    return this.householdApplicancesRepository.create(householdApplicancesDto);
  }

  createFlatTagEntity(flatTagDto: FlatTagDto, householdAppliancesId: number) {
    return this.flatTagRepository.create({
      ...flatTagDto,
      household_appliances_id: householdAppliancesId,
    });
  }

  createRentFlatImage(url: string, rentFlatId: number) {
    return this.rentFlatImageRepository.create({
      image_url: url,
      rent_flat_id: rentFlatId,
    });
  }

  createRentFlatEntity(
    createRentFlatDto: CreateRentFlatDto,
    userId: number,
    addressId: number,
    flatTagId: number,
  ) {
    return this.rentFlatRepository.create({
      price: createRentFlatDto.price,
      currency: createRentFlatDto.currency,
      description: createRentFlatDto.description,
      user_id: userId,
      address_id: addressId,
      flat_tag_id: flatTagId,
    });
  }
}
