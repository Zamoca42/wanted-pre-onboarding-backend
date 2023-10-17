import { Expose, Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';
import { Company } from 'src/company/entities/company.entity';

export class CreateRecruitmentDto {
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

  @Expose()
  @Type(() => CreateCompanyDto)
  company: Company
}
