import { Module } from '@nestjs/common';
import { ApplyService } from './apply.service';
import { ApplyController } from './apply.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Apply } from './entities/apply.entity';
import { Request } from 'src/request/entities/request.entity';

@Module({
  imports: [SequelizeModule.forFeature([Apply, Request])],
  controllers: [ApplyController],
  providers: [ApplyService],
})
export class ApplyModule {}
