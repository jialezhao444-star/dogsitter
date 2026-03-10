import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from './entities/service.entity';

@Module({
  imports: [SequelizeModule.forFeature([Service]) ],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
