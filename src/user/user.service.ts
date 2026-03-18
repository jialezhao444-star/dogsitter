import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userModel.create(
      createUserDto as Partial<User>,
    );
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    return await this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userModel.update(updateUserDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.userModel.destroy({
      where: { id: id },
    });
  }
}
