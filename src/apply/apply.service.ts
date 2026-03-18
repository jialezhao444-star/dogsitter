import { Injectable } from '@nestjs/common';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { Apply } from './entities/apply.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ApplyService {
  constructor(
    @InjectModel(Apply)
    private applyModel: typeof Apply,
  ) {}


  async create(createApplyDto: CreateApplyDto) {
    return await this.applyModel.create(
      createApplyDto as Partial<Apply>,
    );
  }

  async findAll() {
    return await this.applyModel.findAll();
  }

  async findOne(id: number) {
    return await this.applyModel.findByPk(id);
  }

  async update(id: number, updateApplyDto: UpdateApplyDto) {
    return await this.applyModel.update(updateApplyDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.applyModel.destroy({
      where: { id: id },
    });
  }
}
