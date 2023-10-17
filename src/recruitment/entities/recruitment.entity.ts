import { CommonDateEntity } from 'src/common/entities/common.entities';
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
}
