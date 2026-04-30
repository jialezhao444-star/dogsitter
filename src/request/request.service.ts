import { Injectable } from '@nestjs/common';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from './entities/request.entity';
import { CreateFullRequestDto } from './dto/create-full-request.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectModel(Request)
    private requestModel: typeof Request
  ) {}

  async create(createRequestDto: CreateFullRequestDto, currentUserId: number) {
    console.log("DTO RECEIVED:", createRequestDto);
    console.log("USER ID:", currentUserId);
  
    const created = await this.requestModel.create({
      ...createRequestDto,
      user_id: currentUserId,
      status: 'open',
      assigned_dogsitter_id: null,
    });
  
    console.log("CREATED REQUEST:", created.toJSON());
  
    return created;
  }

  async findAll() {
    return await this.requestModel.findAll();
  }

  async findOne(id: number) {
    return await this.requestModel.findByPk(id);
  }

  async findMyRequests(currentUserId: number) {
    return await this.requestModel.findAll({
      where: {
        user_id: currentUserId,
      },
      order: [['id', 'DESC']],
    });
  }

  async update(id: number, updateRequestDto: UpdateRequestDto, currentUserId: number) {
    return await this.requestModel.update(updateRequestDto, {
      where: {
        id: id,
        user_id: currentUserId,
      },
    });
  }

  async remove(id: number, currentUserId: number) {
    return await this.requestModel.destroy({
      where: {
        id: id,
        user_id: currentUserId,
      },
    });
  }

  async findOpenRequests() {
    return await this.requestModel.findAll({
      where: {
        status: 'open',
      },
    });
  }
}