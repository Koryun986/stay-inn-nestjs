import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RentFlatEntity } from "../rent-flat.entity";

@Entity()
export class RentFlatImageEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  image_url: string;

  @OneToOne(() => RentFlatEntity)
  rent_flat: RentFlatEntity;

  @Column()
  rent_flat_id: number;
}
