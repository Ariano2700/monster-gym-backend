import { Role } from 'src/roles/entities/role.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';

export enum Gender {
  Masculino = 'Masculino',
  Femenino = 'Femenino',
  Otro = 'Otro',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  height: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  weight: number;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'date' })
  birthday: Date;

  @CreateDateColumn({ type: 'timestamp' })
  create_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_at: Date;

  @ManyToOne(() => Role, { eager: true })
  @JoinTable()
  id_roles: Role;
}
