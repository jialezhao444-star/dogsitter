import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DogsitterService } from './dogsitter.service';
import { CreateDogsitterDto } from './dto/create-dogsitter.dto';
import { UpdateDogsitterDto } from './dto/update-dogsitter.dto';

@Controller('dogsitter')
export class DogsitterController {
  constructor(private readonly dogsitterService: DogsitterService) {}

  @Post()
  create(@Body() createDogsitterDto: CreateDogsitterDto) {
    return this.dogsitterService.create(createDogsitterDto);
  }

  @Get()
  findAll() {
    return this.dogsitterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogsitterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogsitterDto: UpdateDogsitterDto) {
    return this.dogsitterService.update(+id, updateDogsitterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsitterService.remove(+id);
  }
}
