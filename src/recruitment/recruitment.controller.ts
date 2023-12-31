import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';
import { RecruitmentsFiltersDto } from './dto/read-recruitment-filters.dto';

@Controller()
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get('recruitments')
  async findAll() {
    return this.recruitmentService.findAllRecruitments();
  }

  @Get('recruitments/search')
  async findRecruitments(@Query() request: RecruitmentsFiltersDto) {
    return this.recruitmentService.findRecruitmentsWithFilters(request);
  }

  @Get('recruitment/:id')
  async findOne(@Param('id') id: string) {
    return this.recruitmentService.findOneRecruitmentById(+id);
  }

  @Post('recruitment')
  async create(@Body() request: CreateRecruitmentDto) {
    const createdRecruitmentId =
      await this.recruitmentService.createRecruitment(request);
    return this.recruitmentService.findOneRecruitmentById(createdRecruitmentId);
  }

  @Patch('recruitment/:id')
  async updateRecruitmentById(
    @Param('id') id: string,
    @Body() request: UpdateRecruitmentDto,
  ) {
    await this.recruitmentService.updateRecruitment(+id, request);
    return this.recruitmentService.findOneRecruitmentById(+id);
  }

  @Delete('recruitment/:id')
  async removeRecruitment(@Param('id') id: string) {
    await this.recruitmentService.deleteRecruitmentById(+id);
    return await this.recruitmentService.findAllRecruitments();
  }
}
