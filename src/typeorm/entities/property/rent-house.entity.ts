import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user.entity";
import { Address } from "./address.entity";
import { HouseTag } from "./tags/house-tag.entity";

@Entity()
export class RentHouse {
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

  @OneToOne(() => Address)
  address: Address;

  @Column({
    type: "bigint",
  })
  address_id: number;

  @OneToOne(() => HouseTag)
  house_tag: HouseTag;

  @Column({
    type: "bigint",
  })
  house_tag_id: number;
}
