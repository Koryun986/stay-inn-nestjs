import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "./user.entity";

@Entity()
export class TokenEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column({
    unique: true,
  })
  token: string;

  @Column({
    type: "date",
  })
  expiration: Date;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @Column({
    type: "bigint",
  })
  user_id: number;
}
