import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Communication {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
  id: number;

  @Column()
  electricity: boolean;

  @Column()
  water_supply: boolean;

  @Column()
  gas: boolean;

  @Column()
  sewerage: boolean;
}
