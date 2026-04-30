import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { RequestService } from "./request.service";
import { CreateFullRequestDto } from "./dto/create-full-request.dto";

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createFullRequestDto: CreateFullRequestDto, @Req() req) {
    const createRequest = await this.requestService.create(
      createFullRequestDto,
      req.user.user_id,
    );

    return {
      message: 'Create Data Complete',
      data: createRequest,
    };
  }

  @Get('/open')
  findOpenRequests() {
    return this.requestService.findOpenRequests();
  }

  // ✅ MUST BE BEFORE :id
  @UseGuards(JwtAuthGuard)
  @Get('/my-requests')
  findMyRequests(@Req() req) {
    return this.requestService.findMyRequests(req.user.user_id);
  }

  @Get()
  findAll() {
    return this.requestService.findAll();
  }

  // ✅ PARAM ROUTE ALWAYS LAST
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const numericId = Number(id);

    if (isNaN(numericId)) {
      throw new NotFoundException('Invalid request id');
    }

    const findRequest = await this.requestService.findOne(numericId);

    if (!findRequest) {
      throw new NotFoundException('Request not found');
    }

    return findRequest;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @Req() req,
  ) {
    const [updateRequest] = await this.requestService.update(
      +id,
      updateRequestDto,
      req.user.user_id,
    );

    if (updateRequest === 0) {
      throw new NotFoundException('Not Found Data to Update!!!');
    }

    return { message: 'Update Data Complete' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const destroyRequest = await this.requestService.remove(+id, req.user.user_id);

    if (destroyRequest === 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }

    return { message: 'Remove Data Complete' };
  }
}