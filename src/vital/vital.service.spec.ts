import { Test, TestingModule } from '@nestjs/testing';
import { VitalService } from './vital.service';

describe('VitalService', () => {
  let service: VitalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VitalService],
    }).compile();

    service = module.get<VitalService>(VitalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
