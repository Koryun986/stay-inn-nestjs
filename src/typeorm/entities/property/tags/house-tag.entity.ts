import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HouseholdApplicancesEntity } from "./household-appliances.entity";
import { AmenitiesEntity } from "./amenities.entity";
import { CommunicationEntity } from "./communication.entity";
import {
  BuildingTypeEnum,
  ConditionTypeEnum,
  FurnitureEnum,
  HouseTypeEnum,
  RepairEnum,
} from "./enum/tag.enum";
import {
  BuildingType,
  ConditionType,
  Furniture,
  HouseType,
  Repair,
} from "./types/tag.type";

@Entity()
export class HouseTagEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column({
    type: "enum",
    enum: [
      HouseTypeEnum.House,
      HouseTypeEnum.Townhouse,
      HouseTypeEnum.CountryHouse,
    ],
    default: HouseTypeEnum.House,
  })
  type: HouseType;

  @Column({
    type: "enum",
    enum: [ConditionTypeEnum.Constructed, ConditionTypeEnum.Unfinished],
    default: "Constructed",
  })
  condition: ConditionType;

  @Column({
    type: "enum",
    enum: [
      BuildingTypeEnum.Stone,
      BuildingTypeEnum.Panel,
      BuildingTypeEnum.Monolith,
      BuildingTypeEnum.Brick,
      BuildingTypeEnum.Cassette,
      BuildingTypeEnum.Wooden,
    ],
    default: BuildingTypeEnum.Stone,
  })
  building_type: BuildingType;

  @Column()
  area?: number;

  @Column()
  land_area?: number;

  @Column()
  floors: number;

  @Column()
  rooms: number;

  @Column()
  ceiling_height?: number;

  @Column()
  bathrooms: number;

  @Column()
  garage: number;

  @Column({
    type: "enum",
    enum: [
      FurnitureEnum.Exist,
      FurnitureEnum.NotExist,
      FurnitureEnum.PartialFurniture,
      FurnitureEnum.ByAgreement,
    ],
    default: FurnitureEnum.Exist,
  })
  furniture: Furniture;

  @Column({
    type: "enum",
    enum: [
      RepairEnum.OldRepair,
      RepairEnum.PartialRepair,
      RepairEnum.CosmeticRepair,
      RepairEnum.EuroRenovated,
      RepairEnum.DesignerStyle,
      RepairEnum.Reconstructed,
    ],
    default: RepairEnum.Reconstructed,
  })
  repair: Repair;

  @OneToOne(() => HouseholdApplicancesEntity)
  household_appliances: HouseholdApplicancesEntity;

  @Column({
    type: "bigint",
  })
  household_appliances_id: number;

  @OneToOne(() => AmenitiesEntity)
  amenities: AmenitiesEntity;

  @Column({
    type: "bigint",
  })
  amenities_id: number;

  @OneToOne(() => CommunicationEntity)
  communication: CommunicationEntity;

  @Column({
    type: "bigint",
  })
  communication_id: number;
}
