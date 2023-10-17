import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { Recruitment } from './entities/recruitment.entity';
import { ReadRecruitmentDto } from './dto/read-recruitment.dto';
import { Company } from 'src/company/entities/company.entity';
import { plainToClass } from 'class-transformer';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class RecruitmentService {
  constructor(
    @InjectRepository(Recruitment)
    private recruitmentRepository: Repository<Recruitment>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @Inject(CompanyService)
    private companyService: CompanyService,
  ) {}

  async createRecruitment(
    createRecruitmentDto: CreateRecruitmentDto,
  ): Promise<ReadRecruitmentDto> {
    const { position, reward, skill, content, company } = createRecruitmentDto;

    let companyInfo = await this.companyRepository.findOne({
      where: {
        name: company.name,
      },
    });

    if (!companyInfo) {
      const newCompany = this.companyRepository.create({
        name: company.name,
        country: company.country || '한국',
        district: company.district || '판교',
      });
      companyInfo = await this.companyRepository.save(newCompany);
    }

    const newRecruitment = this.recruitmentRepository.create({
      position,
      reward,
      skill,
      content,
      company: companyInfo,
    });

    await this.recruitmentRepository.save(newRecruitment);

    return plainToClass(ReadRecruitmentDto, {
      id: newRecruitment.id,
      countryName: companyInfo.name,
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
        'recruitment.id as id',
        'company.name as companyName',
        'company.country as country',
        'company.district as district',
        'recruitment.position as position',
        'recruitment.reward as reward',
        'recruitment.skill as skill',
      ])
      .getRawMany();

    return recruitments.map((recruitment) =>
      plainToClass(ReadRecruitmentDto, recruitment),
    );
  }

  async updateRecruitment(
    id: number,
    updateRecruitmentDto: UpdateRecruitmentDto,
  ): Promise<ReadRecruitmentDto | null> {
    const { companyName, country, district, position, reward, skill } =
      updateRecruitmentDto;

    let companyInfo = await this.companyRepository.findOne({
      where: {
        name: companyName,
      },
    });

    if (!companyInfo) {
      const newCompany = this.companyRepository.create({
        name: companyName,
        country: country || '한국',
        district: district || '판교',
      });
      companyInfo = await this.companyRepository.save(newCompany);
    } else {
      companyInfo.name = companyName;
      companyInfo.country = country || '한국';
      companyInfo.district = district || '판교';
    }

    const updateResult = await this.recruitmentRepository
      .createQueryBuilder()
      .update(Recruitment)
      .set({
        position,
        reward,
        skill,
        company: companyInfo,
      })
      .where('id = :id', { id })
      .execute();

    if (updateResult.affected === 0) {
      return null;
    }

    const updatedRecruitment = await this.recruitmentRepository.findOne({
      where: { id },
    });

    return plainToClass(ReadRecruitmentDto, {
      id: updatedRecruitment.id,
      companyName: updatedRecruitment.company.name,
      country: updatedRecruitment.company.country,
      district: updatedRecruitment.company.district,
      position: updatedRecruitment.position,
      reward: updatedRecruitment.reward,
      skill: updatedRecruitment.skill,
    });
  }
}
