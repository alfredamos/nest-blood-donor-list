import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VitalService } from './vital.service';
import { CreateVitalDto } from './dto/create-vital.dto';
import { UpdateVitalDto } from './dto/update-vital.dto';

@Controller('vital')
export class VitalController {
  constructor(private readonly vitalService: VitalService) {}

  @Post()
  create(@Body() createVitalDto: CreateVitalDto) {
    return this.vitalService.create(createVitalDto);
  }

  @Get()
  findAll() {
    return this.vitalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vitalService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVitalDto: UpdateVitalDto) {
    return this.vitalService.update(+id, updateVitalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vitalService.remove(+id);
  }
}
