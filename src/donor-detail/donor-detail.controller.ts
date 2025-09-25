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
import { DonorDetailService } from './donor-detail.service';
import { CreateDonorDetailDto } from './dto/create-donor-detail.dto';
import { UpdateDonorDetailDto } from './dto/update-donor-detail.dto';
import { type Request } from 'express';
import { Roles } from '../decorators/role.decorator';
import { SameUserOrAdminGuard } from '../guards/sameUserOrAdmin.guard';
import { UserInfo } from '../models/userInfo.model';

@Controller('donor-details')
export class DonorDetailController {
  constructor(private readonly donorDetailService: DonorDetailService) {}

  @Roles('Admin', 'Staff', 'User')
  @Post()
  create(
    @Body() createDonorDetailDto: CreateDonorDetailDto,
    @Req() req: Request,
  ) {
    //----> Add user-id to payload.
    const { id } = req.user as UserInfo;
    createDonorDetailDto.userId = id;

    return this.donorDetailService.create(createDonorDetailDto);
  }

  @Roles('Admin')
  @Get()
  findAll() {
    return this.donorDetailService.findAll();
  }

  @Roles('Admin', 'Staff', 'User')
  @UseGuards(SameUserOrAdminGuard)
  @Get('get-by-user-id/:userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.donorDetailService.findAllByUserId(userId);
  }

  @Roles('Admin', 'Staff', 'User')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.donorDetailService.findOne(id, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDonorDetailDto: UpdateDonorDetailDto,
    @Req() req: Request,
  ) {
    //----> Add user-id to payload.
    const { id: userId } = req.user as UserInfo;
    updateDonorDetailDto.userId = userId;

    return this.donorDetailService.update(id, updateDonorDetailDto, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.donorDetailService.remove(id, req);
  }

  @Roles('Admin', 'Staff', 'User')
  @UseGuards(SameUserOrAdminGuard)
  @Delete('delete-by-user-id/:userId')
  removeAllByUserId(@Param('userId') userId: string) {
    return this.donorDetailService.removeAllByUserId(userId);
  }

  @Roles('Admin')
  @Delete('all/delete-all')
  removeAll() {
    return this.donorDetailService.removeAll();
  }
}
