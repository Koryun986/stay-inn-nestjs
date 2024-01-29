import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HouseholdApplicances } from "./household-appliances.entity";
import { Amenities } from "./amenities.entity";
import { Communication } from "./communication.entity";
import { Furniture, FurnitureEnum, Repair, RepairEnum } from "./enum/tag.enum";

type HouseType = "Townhouse" | "House" | "Country House";
type Condition = "Constructed" | "Unfinished";
type BuildingType =
  | "stone"
  | "panel"
  | "monolith"
  | "brick"
  | "cassette"
  | "wooden";

@Entity()
export class HouseTag {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column({
    type: "enum",
    enum: ["Townhouse", "House", "Country House"],
    default: "House",
  })
  type: HouseType;

  @Column({
    type: "enum",
    enum: ["Constructed", "Unfinished"],
    default: "Constructed",
  })
  condition: Condition;

  @Column({
    type: "enum",
    enum: ["stone", "panel", "monolith", "brick", "cassette", "wooden"],
    default: "stone",
  })
  building_type: BuildingType;

  @Column()
  area: number;

  @Column()
  land_area: number;

  @Column()
  floors: number;

  @Column()
  rooms: number;

  @Column()
  ceiling_height: number;

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

  @OneToOne(() => HouseholdApplicances)
  household_appliances: HouseholdApplicances;

  @Column({
    type: "bigint",
  })
  household_appliances_id: number;

  @OneToOne(() => Amenities)
  amenities: Amenities;

  @Column({
    type: "bigint",
  })
  amenities_id: number;

  @OneToOne(() => Communication)
  communication: Communication;

  @Column({
    type: "bigint",
  })
  communication_id: number;
}
