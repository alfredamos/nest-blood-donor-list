import { Test, TestingModule } from '@nestjs/testing';
import { VitalController } from './vital.controller';
import { VitalService } from './vital.service';

describe('VitalController', () => {
  let controller: VitalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VitalController],
      providers: [VitalService],
    }).compile();

    controller = module.get<VitalController>(VitalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
