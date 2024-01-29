import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Amenities {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  swimming_pool: boolean;

  @Column()
  sauna: boolean;

  @Column()
  fireplace: boolean;

  @Column()
  barbecue_oven: boolean;

  @Column()
  security_system: boolean;
}
