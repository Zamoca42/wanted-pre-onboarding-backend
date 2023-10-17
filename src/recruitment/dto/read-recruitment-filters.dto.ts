import { IsOptional, IsString } from 'class-validator';

export class RecruitmentsFiltersDto {
  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  name?: string;
}
