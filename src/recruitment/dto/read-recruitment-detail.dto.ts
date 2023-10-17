import { Expose } from "class-transformer";
import { ReadRecruitmentDto } from "./read-recruitment.dto";

export class ReadRecruitmentDetailDto extends ReadRecruitmentDto{
  @Expose()
  content: string;
}