import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VitalService } from './vital.service';
import { CreateVitalDto } from './dto/create-vital.dto';
import { UpdateVitalDto } from './dto/update-vital.dto';
import { type Request } from 'express';
import { Roles } from '../decorators/role.decorator';
import { SameUserOrAdminGuard } from '../guards/sameUserOrAdmin.guard';

@Controller('vitals')
export class VitalController {
  constructor(private readonly vitalService: VitalService) {}

  @Roles('Admin', 'Staff', 'User')
  @Post()
  create(@Body() createVitalDto: CreateVitalDto) {
    return this.vitalService.create(createVitalDto);
  }

  @Roles('Admin')
  @Get()
  findAll() {
    return this.vitalService.findAll();
  }

  @Roles('Admin')
  @UseGuards(SameUserOrAdminGuard)
  @Get('get-by-user-id/:userId')
  findAllByUserId(@Param('userId') userId: string) {
    return this.vitalService.findAllByUserId(userId);
  }

  @Roles('Admin', 'Staff', 'User')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.vitalService.findOne(id, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVitalDto: UpdateVitalDto,
    @Req() req: Request,
  ) {
    return this.vitalService.update(id, updateVitalDto, req);
  }

  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.vitalService.remove(id, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @UseGuards(SameUserOrAdminGuard)
  @Delete('delete-all-by-user-id/:userId')
  removeAllByUserId(@Param('userId') userId: string) {
    return this.vitalService.removeAllByUserId(userId);
  }

  @Roles('Admin')
  @Delete('all/delete-all')
  removeAll() {
    return this.vitalService.removeAll();
  }
}
