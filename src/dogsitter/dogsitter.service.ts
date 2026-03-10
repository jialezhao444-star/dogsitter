import { Injectable } from '@nestjs/common';
import { CreateDogsitterDto } from './dto/create-dogsitter.dto';
import { UpdateDogsitterDto } from './dto/update-dogsitter.dto';

@Injectable()
export class DogsitterService {
  create(createDogsitterDto: CreateDogsitterDto) {
    return 'This action adds a new dogsitter';
  }

  findAll() {
    return `This action returns all dogsitter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dogsitter`;
  }

  update(id: number, updateDogsitterDto: UpdateDogsitterDto) {
    return `This action updates a #${id} dogsitter`;
  }

  remove(id: number) {
    return `This action removes a #${id} dogsitter`;
  }
}
