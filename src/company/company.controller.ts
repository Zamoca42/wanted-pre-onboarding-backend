import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CommonResponse } from 'src/common/common.response';
import { ReadCompanyDto } from './dto/read-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() request: CreateCompanyDto) {
    const createdCompany = await this.companyService.createCompany(request);
    return new CommonResponse<ReadCompanyDto>(true, '성공', createdCompany);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findOneCompany = await this.companyService.findOneCompany(+id);
    if (findOneCompany) {
      return new CommonResponse<ReadCompanyDto>(true, '성공', findOneCompany);
    } else {
      return new CommonResponse<ReadCompanyDto>(
        false,
        '회사를 찾을 수 없습니다.',
        null,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    const updatedCompany = await this.companyService.updateCompany(
      +id,
      updateCompanyDto,
    );
    if (updatedCompany) {
      return new CommonResponse<ReadCompanyDto>(
        true,
        '업데이트 성공',
        updatedCompany,
      );
    } else {
      return new CommonResponse<ReadCompanyDto>(
        false,
        '회사를 찾을 수 없습니다.',
        null,
      );
    }
  }
}
