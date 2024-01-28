import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentFlat } from "../rent-flat.entity";

@Entity()
export class RentFlatImage {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  image_url: string;

  @OneToOne(() => RentFlat)
  rent_flat: RentFlat;

  @Column()
  rent_flat_id: number;
}
