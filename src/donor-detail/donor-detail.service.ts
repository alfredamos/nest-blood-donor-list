import { Injectable } from '@nestjs/common';
import { CreateDonorDetailDto } from './dto/create-donor-detail.dto';
import { UpdateDonorDetailDto } from './dto/update-donor-detail.dto';

@Injectable()
export class DonorDetailService {
  create(createDonorDetailDto: CreateDonorDetailDto) {
    return 'This action adds a new donorDetail';
  }

  findAll() {
    return `This action returns all donorDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donorDetail`;
  }

  update(id: number, updateDonorDetailDto: UpdateDonorDetailDto) {
    return `This action updates a #${id} donorDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} donorDetail`;
  }
}
