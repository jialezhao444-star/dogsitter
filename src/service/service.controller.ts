import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/create')
  async create(@Body() createServiceDto: CreateServiceDto) {
    const createService = await this.serviceService.create(createServiceDto);
    if (createService == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createService,
    };
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findService = await this.serviceService.findOne(+id);
    if (findService == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findService;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateServiceDto: UpdateServiceDto) {
      const [updateService] = await this.serviceService.update(
        +id,
        updateServiceDto,
      );
    console.log(updateService);
    if (updateService === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyService = await this.serviceService.remove(+id);
    console.log(destroyService);
    if (destroyService == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
