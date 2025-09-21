import { Test, TestingModule } from '@nestjs/testing';
import { DonorDetailController } from './donor-detail.controller';
import { DonorDetailService } from './donor-detail.service';

describe('DonorDetailController', () => {
  let controller: DonorDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonorDetailController],
      providers: [DonorDetailService],
    }).compile();

    controller = module.get<DonorDetailController>(DonorDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
