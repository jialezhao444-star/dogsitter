import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DogService } from './dog.service';
import { DogController } from './dog.controller';
import { Dog } from './entities/dog.entity';

@Module({
  imports: [SequelizeModule.forFeature([Dog])],
  controllers: [DogController],
  providers: [DogService],
})
export class DogModule {}
