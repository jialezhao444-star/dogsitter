import { Module } from '@nestjs/common';
import { DogsitterService } from './dogsitter.service';
import { DogsitterController } from './dogsitter.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dogsitter } from './entities/dogsitter.entity';

@Module({
  imports: [SequelizeModule.forFeature([Dogsitter])],
  controllers: [DogsitterController],
  providers: [DogsitterService],
})
export class DogsitterModule {}
