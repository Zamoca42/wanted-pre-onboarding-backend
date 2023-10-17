import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Exclude()
export class CommonDateEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
