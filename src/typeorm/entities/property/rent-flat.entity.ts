import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { User } from "../user.entity";
import { FlatTag } from "./tags/flat-tag.entity";

@Entity()
export class RentFlat {
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

  @OneToOne(() => User)
  user: User;

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

  @OneToOne(() => FlatTag)
  flat_tag: FlatTag;

  @Column({
    type: "bigint",
  })
  flat_tag_id: number;
}
