import { PartialType } from '@nestjs/mapped-types';
import { ReadRecruitmentDetailDto } from './read-recruitment-detail.dto';

export class UpdateRecruitmentDto extends PartialType(ReadRecruitmentDetailDto) {}
