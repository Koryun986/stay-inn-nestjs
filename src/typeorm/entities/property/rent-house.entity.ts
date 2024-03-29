import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user.entity";
import { AddressEntity } from "./address.entity";
import { HouseTagEntity } from "./tags/house-tag.entity";

@Entity()
export class RentHouseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  price: number;

  @Column()
  currency: string;

  @Column({
    type: "text",
  })
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

  @OneToOne(() => HouseTagEntity)
  house_tag: HouseTagEntity;

  @Column({
    type: "bigint",
  })
  house_tag_id: number;
}
