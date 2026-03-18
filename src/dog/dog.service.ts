import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class DogService {
  constructor(
    @InjectModel(Dog)
    private dogModel: typeof Dog,
  ) {}

  async create(createDogDto: CreateDogDto) {
    return await this.dogModel.create(
      createDogDto as Partial<Dog>,
    );
  }

  async findAll() {
    return await this.dogModel.findAll();
  }

  async findOne(id: number) {
    return await this.dogModel.findByPk(id);
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    return await this.dogModel.update(updateDogDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.dogModel.destroy({
      where: { id: id },
    });
  }
}
