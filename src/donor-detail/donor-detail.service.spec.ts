import { Test, TestingModule } from '@nestjs/testing';
import { DonorDetailService } from './donor-detail.service';

describe('DonorDetailService', () => {
  let service: DonorDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonorDetailService],
    }).compile();

    service = module.get<DonorDetailService>(DonorDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
