import { Injectable } from '@nestjs/common';
import { CreateDogsitterDto } from './dto/create-dogsitter.dto';
import { UpdateDogsitterDto } from './dto/update-dogsitter.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Dogsitter } from './entities/dogsitter.entity';

@Injectable()
export class DogsitterService {
  constructor(
    @InjectModel(Dogsitter)
    private dogsitterModel: typeof Dogsitter,
  ) {}

  async create(createDogsitterDto: CreateDogsitterDto) {
    return await this.dogsitterModel.create(
      createDogsitterDto as Partial<Dogsitter>,
    );
  }

  async findAll() {
    return await this.dogsitterModel.findAll();
  }

  async findOne(id: number) {
    return await this.dogsitterModel.findByPk(id);
  }

  async update(id: number, updateDogsitterDto: UpdateDogsitterDto) {
    return await this.dogsitterModel.update(updateDogsitterDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.dogsitterModel.destroy({
      where: { id: id },
    });
  }
}
