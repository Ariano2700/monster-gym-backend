import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MembershipsType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 225 })
  description: string;

  @Column({ type: 'int' })
  price: number;
}
