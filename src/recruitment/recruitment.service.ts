import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { Recruitment } from './entities/recruitment.entity';
import { ReadRecruitmentDto } from './dto/read-recruitment.dto';
import { Company } from 'src/company/entities/company.entity';
import { plainToClass } from 'class-transformer';
import { CompanyService } from 'src/company/company.service';
import { ReadRecruitmentDetailDto } from './dto/read-recruitment-detail.dto';

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
  ): Promise<number> {
    const { position, reward, skill, content, name, district, country } =
      createRecruitmentDto;

    let companyInfo = await this.companyRepository.findOne({
      where: {
        name,
      },
    });

    if (!companyInfo) {
      const newCompany = this.companyRepository.create({
        name,
        country: country || '한국',
        district: district || '판교',
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

    return newRecruitment.id;
  }

  async findOneRecruitmentById(id: number): Promise<ReadRecruitmentDetailDto> {
    const findCompany = await this.recruitmentRepository.findOne({
      where: {
        id,
      },
      relations: ['company'],
    });

    if (!findCompany) {
      throw new NotFoundException(`Recruitment with ID ${id} not found`);
    }

    return plainToClass(ReadRecruitmentDetailDto, {
      id,
      name: findCompany.company.name,
      country: findCompany.company.country,
      district: findCompany.company.district,
      position: findCompany.position,
      reward: findCompany.reward,
      skill: findCompany.skill,
      content: findCompany.content,
    });
  }

  async findAllRecruitments(): Promise<ReadRecruitmentDto[]> {
    const recruitments = await this.recruitmentRepository
      .createQueryBuilder('recruitment')
      .leftJoin('recruitment.company', 'company')
      .select([
        'recruitment.id as id',
        'company.name as name',
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
  ): Promise<void> {
    const { name, country, district, position, reward, skill } =
      updateRecruitmentDto;

    let companyInfo = await this.companyRepository.findOne({
      where: {
        name: name,
      },
    });

    if (!companyInfo) {
      const newCompany = this.companyRepository.create({
        name: name,
        country: country || '한국',
        district: district || '판교',
      });
      companyInfo = await this.companyRepository.save(newCompany);
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
      throw new BadRequestException(`Recruitment ${id} NOT updated`);
    }
  }

  async deleteRecruitmentById(id: number): Promise<void> {
    const recruitment = await this.recruitmentRepository.findOne({
      where: { id },
    });

    if (!recruitment) {
      throw new NotFoundException(`Recruitment ${id} NOT found`);
    }

    await this.recruitmentRepository.remove(recruitment);
  }
}
