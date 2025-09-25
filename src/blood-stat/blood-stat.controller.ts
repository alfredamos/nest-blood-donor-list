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
import { BloodStatService } from './blood-stat.service';
import { CreateBloodStatDto } from './dto/create-blood-stat.dto';
import { UpdateBloodStatDto } from './dto/update-blood-stat.dto';
import { Roles } from '../decorators/role.decorator';
import { type Request } from 'express';
import { SameUserOrAdminGuard } from '../guards/sameUserOrAdmin.guard';
import { UserInfo } from '../models/userInfo.model';
import { Reflector } from '@nestjs/core';

@Controller('blood-stats')
export class BloodStatController {
  constructor(private readonly bloodStatService: BloodStatService) {}

  @Roles('Admin', 'Staff', 'User')
  @Post()
  create(@Body() createBloodStatDto: CreateBloodStatDto, @Req() req: Request) {
    //----> Get the user-id from context.
    const { id: userId } = req.user as UserInfo;
    createBloodStatDto.userId = userId;

    return this.bloodStatService.create(createBloodStatDto);
  }

  @Roles('Admin')
  @Get()
  findAll() {
    return this.bloodStatService.findAll();
  }

  @Roles('Admin', 'Staff', 'User')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.bloodStatService.findOne(id, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @UseGuards(SameUserOrAdminGuard)
  @Get('get-by-user-id/:userId')
  findOneByUserId(@Param('userId') userId: string) {
    return this.bloodStatService.findOneByUserId(userId);
  }

  @Roles('Admin', 'Staff', 'User')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBloodStatDto: UpdateBloodStatDto,
    @Req() req: Request,
  ) {
    //----> Get the user-id from context.
    const { id: userId } = req.user as UserInfo;
    updateBloodStatDto.userId = userId;

    return this.bloodStatService.update(id, updateBloodStatDto, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.bloodStatService.remove(id, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @UseGuards(SameUserOrAdminGuard)
  @Delete('delete-by-user-id/:userId')
  removeByUserId(@Param('userId') userId: string) {
    return this.bloodStatService.removeOneByUserId(userId);
  }

  @Roles('Admin')
  @Delete('all/delete-all')
  removeAll() {
    return this.bloodStatService.removeAll();
  }
}
