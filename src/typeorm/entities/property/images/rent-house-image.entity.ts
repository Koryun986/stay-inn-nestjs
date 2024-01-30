import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentHouseEntity } from "../rent-house.entity";

@Entity()
export class RentHouseImage {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  image_url: string;

  @OneToOne(() => RentHouseEntity)
  rent_house: RentHouseEntity;

  @Column()
  rent_house_id: number;
}
