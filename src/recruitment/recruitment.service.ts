import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { Recruitment } from './entities/recruitment.entity';
import { ReadRecruitmentDto } from './dto/read-recruitment.dto';
import { Company } from 'src/company/entities/company.entity';
import { plainToClass } from 'class-transformer';
import { CompanyService } from 'src/company/company.service';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>, // private readonly companyService: CompanyService,
  ) {}

  async createRecruitment(
    createRecruitmentDto: CreateRecruitmentDto,
  ): Promise<ReadRecruitmentDto> {
    const { position, reward, skill, content, company } = createRecruitmentDto;

    // const companyInfo = await this.companyRepository.findOne({
    //   where: {
    //     name,
    //   },
    // });
    // if (!companyInfo) {
    //   this.companyService.createCompany();
    // }
    const companyInfo = await this.companyRepository.findOne({
      where: {
        id: company.id,
      },
    });

    const newRecruitment = this.recruitmentRepository.create({
      position,
      reward,
      skill,
      content,
      company: companyInfo,
    });

    await this.recruitmentRepository.save(newRecruitment);

    // Retrieve additional company information

    return plainToClass(ReadRecruitmentDto, {
      id: newRecruitment.id,
      name: companyInfo.name,
      country: companyInfo.country,
      district: companyInfo.district,
      position: newRecruitment.position,
      reward: newRecruitment.reward,
      skill: newRecruitment.skill,
    });
  }

  async findAllRecruitments(): Promise<ReadRecruitmentDto[]> {
    const recruitments = await this.recruitmentRepository
      .createQueryBuilder('recruitment')
      .leftJoin('recruitment.company', 'company')
      .select([
        'recruitment.id',
        'company.name',
        'company.country',
        'company.district',
        'recruitment.position',
        'recruitment.reward',
        'recruitment.skill',
      ])
      .getMany();

    return plainToClass(ReadRecruitmentDto, recruitments);
  }

  // async updateRecruitment(
  //   id: number,
  //   updateRecruitmentDto: UpdateRecruitmentDto,
  // ): Promise<Recruitment | null> {
  //   const existingRecruitment = await this.recruitmentRepository.findOne(id);
  //   if (!existingRecruitment) {
  //     return null; // 채용공고를 찾을 수 없음
  //   }

  //   this.recruitmentRepository.merge(existingRecruitment, updateRecruitmentDto);
  //   return this.recruitmentRepository.save(existingRecruitment);
  // }

  // async removeRecruitment(id: number): Promise<Recruitment | null> {
  //   const existingRecruitment = await this.recruitmentRepository.findOne(id);
  //   if (!existingRecruitment) {
  //     return null; // 채용공고를 찾을 수 없음
  //   }

  //   await this.recruitmentRepository.remove(existingRecruitment);
  //   return existingRecruitment;
  // }
}
