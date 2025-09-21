import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DonorDetailService } from './donor-detail.service';
import { CreateDonorDetailDto } from './dto/create-donor-detail.dto';
import { UpdateDonorDetailDto } from './dto/update-donor-detail.dto';

@Controller('donor-detail')
export class DonorDetailController {
  constructor(private readonly donorDetailService: DonorDetailService) {}

  @Post()
  create(@Body() createDonorDetailDto: CreateDonorDetailDto) {
    return this.donorDetailService.create(createDonorDetailDto);
  }

  @Get()
  findAll() {
    return this.donorDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.donorDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDonorDetailDto: UpdateDonorDetailDto) {
    return this.donorDetailService.update(+id, updateDonorDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.donorDetailService.remove(+id);
  }
}
