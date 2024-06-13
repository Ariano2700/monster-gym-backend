import { MembershipsType } from "src/memberships_type/entities/memberships_type.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @ManyToOne(() => MembershipsType)
  id_memberships_type: MembershipsType;

  @ManyToOne(() => User)
  id_user: User;
}