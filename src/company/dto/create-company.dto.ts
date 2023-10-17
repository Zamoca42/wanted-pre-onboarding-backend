import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  country: string;

  @IsString()
  @Expose()
  district: string;
}
