import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HouseholdApplicances } from "./household-appliances.entity";
import { Amenities } from "./amenities.entity";
import compareAsc from "date-fns/compareAsc";
import { Communication } from "./communication.entity";

type HouseType = "Townhouse" | "House" | "Country House";
type Condition = "Constructed" | "Unfinished";
type BuildingType =
  | "stone"
  | "panel"
  | "monolith"
  | "brick"
  | "cassette"
  | "wooden";
type Furniture = "Exist" | "Not Exist" | "Partial Furniture" | "By Agreement";
type Repair =
  | "Old Repair"
  | "Partial Repair"
  | "Cosmetic Repair"
  | "Euro-renovated"
  | "Renovated In Designer Style"
  | "Thoroughly Reconstructed";

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
    enum: ["Exist", "Not Exist", "Partial Furniture", "By Agreement"],
    default: "Exist",
  })
  furniture: Furniture;

  @Column({
    type: "enum",
    enum: [
      "Old Repair",
      "Partial Repair",
      "Cosmetic Repair",
      "Euro-renovated",
      "Renovated In Designer Style",
      "Thoroughly Reconstructed",
    ],
    default: "Thoroughly Reconstructed",
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
