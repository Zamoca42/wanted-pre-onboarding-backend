import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CommonDateEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
