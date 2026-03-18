import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Service } from './entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service)
    private serviceModel: typeof Service,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceModel.create(
      createServiceDto as Partial<Service>,
    );
  }

  async findAll() {
    return await this.serviceModel.findAll();
  }

  async findOne(id: number) {
    return await this.serviceModel.findByPk(id);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.serviceModel.update(updateServiceDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.serviceModel.destroy({
      where: { id: id },
    });
  }
}
