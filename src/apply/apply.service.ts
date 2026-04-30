import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateApplyDto } from './dto/create-apply.dto';
import { UpdateApplyDto } from './dto/update-apply.dto';
import { Apply } from './entities/apply.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'src/request/entities/request.entity';

@Injectable()
export class ApplyService {
  constructor(
    @InjectModel(Apply)
    private applyModel: typeof Apply,

    @InjectModel(Request)
    private requestModel: typeof Request,
  ) {}

  async create(createApplyDto: CreateApplyDto, currentDogsitterId: number) {
    const request = await this.requestModel.findByPk(createApplyDto.request_id);
  
    if (!request) {
      throw new NotFoundException('Request not found');
    }
  
    if (request.get('status') !== 'open') {
      throw new BadRequestException('This request is no longer available');
    }
  
    const createApply = await this.applyModel.create({
      request_id: createApplyDto.request_id,
      dogsitter_id: currentDogsitterId,
      status: 'selected',
    } as Partial<Apply>);
  
    await this.requestModel.update(
      {
        status: 'assigned',
        assigned_dogsitter_id: currentDogsitterId,
      },
      {
        where: { id: createApplyDto.request_id },
      },
    );
  
    return createApply;
  }

  async findMyApplications(currentDogsitterId: number) {
  return await this.applyModel.findAll({
    where: {
      dogsitter_id: currentDogsitterId,
    },
    order: [['id', 'DESC']],
  });
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

  async remove(id: number, currentDogsitterId: number) {
    const apply = await this.applyModel.findOne({
      where: {
        id: id,
        dogsitter_id: currentDogsitterId,
      },
    });
  
    if (!apply) {
      throw new NotFoundException('Application not found');
    }
  
    const requestId = apply.request_id;
  
    const request = await this.requestModel.findByPk(requestId);
  
    await this.applyModel.destroy({
      where: {
        id: id,
        dogsitter_id: currentDogsitterId,
      },
    });
  
    // FORCE SAME TYPE BEFORE COMPARISON
    if (request && Number(request.assigned_dogsitter_id) === Number(currentDogsitterId)) {
      await this.requestModel.update(
        {
          assigned_dogsitter_id: null,
          status: 'open',
        },
        {
          where: { id: requestId },
        },
      );
    }
  
    return 1;
  }
}