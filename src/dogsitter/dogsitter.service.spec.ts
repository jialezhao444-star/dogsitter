import { Test, TestingModule } from '@nestjs/testing';
import { DogsitterService } from './dogsitter.service';

describe('DogsitterService', () => {
  let service: DogsitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsitterService],
    }).compile();

    service = module.get<DogsitterService>(DogsitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
