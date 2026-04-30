import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, Req } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('apply')
export class ApplyController {
  constructor(private readonly applyService: ApplyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createApplyDto: CreateApplyDto, @Req() req) {
    const createApply = await this.applyService.create(
      createApplyDto,
      req.user.user_id,
    );

    if (createApply == null) {
      throw new Error('Can not Create Data!!!');
    }

    return {
      message: 'Create Data Complete',
      data: createApply,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my-applications')
  findMyApplications(@Req() req) {
    return this.applyService.findMyApplications(req.user.user_id);
  }

  @Get()
  findAll() {
    return this.applyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findApply = await this.applyService.findOne(+id);
    if (findApply == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findApply;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateApplyDto: UpdateApplyDto) {
      const [updateApply] = await this.applyService.update(
        +id,
        updateApplyDto,
      );
    console.log(updateApply);
    if (updateApply === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const destroyApply = await this.applyService.remove(+id, req.user.user_id);

    if (destroyApply == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }

    return { message: 'Remove Data Complete' };
  }
}
