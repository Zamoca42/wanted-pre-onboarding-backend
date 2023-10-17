import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecruitmentService } from './recruitment.service';
import { CreateRecruitmentDto } from './dto/create-recruitment.dto';
import { UpdateRecruitmentDto } from './dto/update-recruitment.dto';

@Controller()
export class RecruitmentController {
  constructor(private readonly recruitmentService: RecruitmentService) {}

  @Get('recruitments')
  findAll() {
    return this.recruitmentService.findAllRecruitments();
  }

  @Post('recruitment')
  create(@Body() request: CreateRecruitmentDto) {
    return this.recruitmentService.createRecruitment(request);
  }

  // @Patch('recruitment/:id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateRecruitmentDto: UpdateRecruitmentDto,
  // ) {
  //   return this.recruitmentService.updateRecruitment(+id, updateRecruitmentDto);
  // }

  // @Delete('recruitment/:id')
  // remove(@Param('id') id: string) {
  //   return this.recruitmentService.removeRecruitment(+id);
  // }
}
