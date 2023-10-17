import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CommonResponse } from 'src/common/common.response';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { ReadCompanyDto } from './dto/read-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRpository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto): string {
    this.companyRpository.save(createCompanyDto);
    return 'This action adds a new company';
  }

  findOne(id: number): ReadCompanyDto {
    const findCompany = this.companyRpository.findOne({
      where: {
        id,
      },
    });
    return plainToClass(ReadCompanyDto, findCompany);
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
