import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ReadRecruitmentDto {
  @Expose()
  id: number;

  @Expose()
  companyName: string;

  @Expose()
  country: string;

  @Expose()
  district: string;

  @Expose()
  position: string;

  @Expose()
  reward: number;

  @Expose()
  skill: string;
}
