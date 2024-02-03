import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  building: string;
}
