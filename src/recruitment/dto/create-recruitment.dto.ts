import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

export class CreateRecruitmentDto extends CreateCompanyDto {
  @IsString()
  @Expose()
  position: string;

  @IsNumber()
  @Expose()
  reward: number;

  @IsString()
  @Expose()
  skill: string;

  @IsString()
  @Expose()
  content: string;
}
