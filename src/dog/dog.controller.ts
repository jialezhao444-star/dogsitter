import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  @Post('/create')
  async create(@Body() createDogDto: CreateDogDto) {
    const createDog = await this.dogService.create(createDogDto);
    if (createDog == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createDog,
    };
  }

  @Get()
  findAll() {
    return this.dogService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findDog = await this.dogService.findOne(+id);
    if (findDog == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findDog;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateDogDto: UpdateDogDto) {
      const [updateDog] = await this.dogService.update(
        +id,
        updateDogDto,
      );
    console.log(updateDog);
    if (updateDog === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyDog = await this.dogService.remove(+id);
    console.log(destroyDog);
    if (destroyDog == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
