import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { HouseholdApplicances } from "./household-appliances.entity";

@Entity()
export class FlatTag {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  area: number;

  @Column()
  floor: number;

  @Column()
  rooms: number;

  @Column()
  ceiling_height: number;

  @Column()
  bathrooms: number;

  @Column()
  balconies: number;

  @Column()
  furniture: number;

  @Column()
  repair: string;

  @Column()
  elevator: boolean;

  @OneToOne(() => HouseholdApplicances)
  household_appliances: HouseholdApplicances;

  @Column({
    type: "bigint",
  })
  household_appliances_id: number;
}
