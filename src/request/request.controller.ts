import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('/create')
  async create(@Body() createRequestDto: CreateRequestDto) {
    const createRequest = await this.requestService.create(createRequestDto);
    if (createRequest == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createRequest,
    };
  }

  @Get('/open')
  findOpenRequests() {
    return this.requestService.findOpenRequests();
  }

  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findRequest = await this.requestService.findOne(+id);
    if (findRequest == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findRequest;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateRequestDto: UpdateRequestDto) {
      const [updateRequest] = await this.requestService.update(
        +id,
        updateRequestDto,
      );
    console.log(updateRequest);
    if (updateRequest === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyRequest = await this.requestService.remove(+id);
    console.log(destroyRequest);
    if (destroyRequest == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
