import { Test, TestingModule } from '@nestjs/testing';
import { DogsitterController } from './dogsitter.controller';
import { DogsitterService } from './dogsitter.service';

describe('DogsitterController', () => {
  let controller: DogsitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsitterController],
      providers: [DogsitterService],
    }).compile();

    controller = module.get<DogsitterController>(DogsitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
