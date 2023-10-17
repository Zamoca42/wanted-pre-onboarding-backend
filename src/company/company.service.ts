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
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  // create(createCompanyDto: CreateCompanyDto): string {
  //   this.companyRpository.save(createCompanyDto);
  //   return 'This action adds a new company';
  // }

  async create(createCompanyDto: CreateCompanyDto): Promise<ReadCompanyDto> {
    const newCompany = this.companyRepository.create(createCompanyDto);
    await this.companyRepository.save(newCompany);
    return plainToClass(ReadCompanyDto, newCompany);
  }

  async findOne(id: number): Promise<ReadCompanyDto | null> {
    const findCompany = this.companyRepository.findOne({
      where: {
        id,
      },
    });
    if (findCompany) {
      return plainToClass(ReadCompanyDto, findCompany);
    }
    return null;
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<ReadCompanyDto | null> {
    const existingCompany = this.companyRepository.findOne({
      where: {
        id,
      },
    });

    if (!existingCompany) {
      return null;
    }

    await this.companyRepository
      .createQueryBuilder()
      .update(Company)
      .set(updateCompanyDto)
      .where('id = :id', { id: id })
      .execute();

    const updatedCompany = await this.companyRepository.findOne({
      where: {
        id,
      },
    });
    return plainToClass(ReadCompanyDto, updatedCompany);
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
