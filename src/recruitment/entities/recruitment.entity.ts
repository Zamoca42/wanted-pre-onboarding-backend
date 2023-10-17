import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CRUD')
export class Recruitment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  desc: string;
}
