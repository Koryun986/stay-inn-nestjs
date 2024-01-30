import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { UserEntity } from "../user.entity";
import { FlatTagEntity } from "./tags/flat-tag.entity";

@Entity()
export class RentFlatEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column()
  description: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    type: "bigint",
  })
  user_id: number;

  @OneToOne(() => AddressEntity)
  address: AddressEntity;

  @Column({
    type: "bigint",
  })
  address_id: number;

  @OneToOne(() => FlatTagEntity)
  flat_tag: FlatTagEntity;

  @Column({
    type: "bigint",
  })
  flat_tag_id: number;
}
