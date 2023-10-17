import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { Recruitment } from './entities/recruitment.entity';
import { ReadRecruitmentDto } from './dto/read-recruitment.dto';
import { Company } from 'src/company/entities/company.entity';
import { plainToClass } from 'class-transformer';
import { CompanyService } from 'src/company/company.service';
import { ReadRecruitmentDetailDto } from './dto/read-recruitment-detail.dto';
import { RecruitmentsFiltersDto } from './dto/read-recruitment-filters.dto';

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

  private async getRecruitmentQuery() {
    return this.recruitmentRepository
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
      ]);
  }

  private async executeRecruitmentQuery(
    query: SelectQueryBuilder<Recruitment>,
  ) {
    const recruitments = await query.getRawMany();
    return recruitments.map((recruitment) =>
      plainToClass(ReadRecruitmentDto, recruitment),
    );
  }

  async findRecruitmentsWithFilters(request: RecruitmentsFiltersDto) {
    const queryRecruitments = await this.getRecruitmentQuery();

    if (request.name && request.position) {
      queryRecruitments.where('name = :name OR position = :position', {
        name: request.name,
        position: request.position,
      });
    } else if (request.name) {
      queryRecruitments.andWhere('name = :name', { name: request.name });
    } else if (request.position) {
      queryRecruitments.andWhere('position = :position', {
        position: request.position,
      });
    }

    return this.executeRecruitmentQuery(queryRecruitments);
  }

  async findAllRecruitments(): Promise<ReadRecruitmentDto[]> {
    const queryRecruitments = await this.getRecruitmentQuery();
    return this.executeRecruitmentQuery(queryRecruitments);
  }

  async updateRecruitment(
    id: number,
    updateRecruitmentDto: UpdateRecruitmentDto,
  ): Promise<void> {
    const { name, country, district, position, reward, skill, content } =
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
        content,
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
