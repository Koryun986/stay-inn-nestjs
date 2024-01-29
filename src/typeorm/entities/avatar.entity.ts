import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  avatar_url: string;

  @OneToOne(() => User)
  lodging: User;

  @Column({
    type: "bigint",
  })
  user_id: number;
}
