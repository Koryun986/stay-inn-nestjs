import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HouseholdApplicances } from "./household-appliances.entity";
import { FurnitureEnum, RepairEnum } from "./enum/tag.enum";
import { Furniture, Repair } from "./types/tag.type";

@Entity()
export class FlatTagEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  area?: number;

  @Column()
  floor: number;

  @Column()
  rooms: number;

  @Column()
  ceiling_height?: number;

  @Column()
  bathrooms: number;

  @Column()
  balconies: number;

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

  @Column()
  elevator: boolean;

  @OneToOne(() => HouseholdApplicances)
  household_appliances: HouseholdApplicances;

  @Column({
    type: "bigint",
  })
  household_appliances_id: number;
}
