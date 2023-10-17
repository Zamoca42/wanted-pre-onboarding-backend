import { CommonDateEntity } from 'src/common/entities/common.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class Company extends CommonDateEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'companyId' })
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  district: string;
}
