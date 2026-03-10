import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { Request } from './entities/request.entity';
@Module({
  imports: [SequelizeModule.forFeature([Request])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
