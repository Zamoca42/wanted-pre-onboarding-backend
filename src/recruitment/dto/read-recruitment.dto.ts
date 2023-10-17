import { Expose } from 'class-transformer';
import { CreateRecruitmentDto } from './create-recruitment.dto';

export class ReadRecruitmentDto extends CreateRecruitmentDto{
  @Expose()
  id: number;
}
