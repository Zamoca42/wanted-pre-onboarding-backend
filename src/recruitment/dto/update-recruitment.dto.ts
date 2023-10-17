import { PartialType } from '@nestjs/mapped-types';
import { ReadRecruitmentDto } from './read-recruitment.dto';

export class UpdateRecruitmentDto extends PartialType(ReadRecruitmentDto) {}
