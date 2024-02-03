import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class HouseholdApplicancesEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  stove: boolean;

  @Column()
  air_conditioner: boolean;

  @Column()
  refrigerator: boolean;

  @Column()
  dishwasher: boolean;

  @Column()
  washing_machine: boolean;

  @Column()
  tumble_dryer: boolean;
}
