import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DogsitterService } from './dogsitter.service';
import { CreateDogsitterDto } from './dto/create-dogsitter.dto';
import { UpdateDogsitterDto } from './dto/update-dogsitter.dto';

@Controller('dogsitter')
export class DogsitterController {
  constructor(private readonly dogsitterService: DogsitterService) {}

  @Post('/create')
  async create(@Body() createDogsitterDto: CreateDogsitterDto) {
    const createDogsitter = await this.dogsitterService.create(createDogsitterDto);
    if (createDogsitter == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createDogsitter,
    };
  }

  @Get()
  findAll() {
    return this.dogsitterService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findDogsitter = await this.dogsitterService.findOne(+id);
    if (findDogsitter == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findDogsitter;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateDogsitterDto: UpdateDogsitterDto) {
      const [updateDogsitter] = await this.dogsitterService.update(
        +id,
        updateDogsitterDto,
      );
    console.log(updateDogsitter);
    if (updateDogsitter === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyDogsitter = await this.dogsitterService.remove(+id);
    console.log(destroyDogsitter);
    if (destroyDogsitter == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
