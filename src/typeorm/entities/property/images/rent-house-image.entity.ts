import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentHouse } from "../rent-house.entity";

@Entity()
export class RentHouseImage {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  image_url: string;

  @OneToOne(() => RentHouse)
  rent_house: RentHouse;

  @Column()
  rent_house_id: number;
}
