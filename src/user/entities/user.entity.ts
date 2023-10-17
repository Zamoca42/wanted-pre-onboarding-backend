import { CommonDateEntity } from 'src/common/entities/common.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends CommonDateEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}
