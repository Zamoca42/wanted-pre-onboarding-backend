import { Expose } from "class-transformer";
import { CreateCompanyDto } from "./create-company.dto";

export class ReadCompanyDto extends CreateCompanyDto {
  @Expose()
  id: number;
}