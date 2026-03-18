import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from './entities/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request)
    private requestModel: typeof Request,
  ) {}

  async create(createRequestDto: CreateRequestDto) {
    return await this.requestModel.create(
      createRequestDto as Partial<Request>,
    );
  }

  async findAll() {
    return await this.requestModel.findAll();
  }

  async findOne(id: number) {
    return await this.requestModel.findByPk(id);
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    return await this.requestModel.update(updateRequestDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.requestModel.destroy({
      where: { id: id },
    });
  }
}
