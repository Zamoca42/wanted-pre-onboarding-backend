import { CommonDateEntity } from 'src/common/entities/common.entities';
import { Recruitment } from 'src/recruitment/entities/recruitment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Recruitment, (recruitment) => recruitment.company)
  recruitments: Recruitment[];
}
