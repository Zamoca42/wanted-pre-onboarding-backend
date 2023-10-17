import { CommonDateEntity } from 'src/common/entities/common.entities';
import { Company } from 'src/company/entities/company.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('recruitment')
export class Recruitment extends CommonDateEntity {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'recruitmentId' })
  id: number;

  @Column()
  position: string;

  @Column()
  reward: number;

  @Column()
  skill: string;

  @Column()
  content: string;

  @ManyToOne(() => Company, (company) => company.recruitments)
  company: Company;
}
