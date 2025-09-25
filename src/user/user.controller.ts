import { Controller, Get, Param, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../decorators/role.decorator';
import { type Request } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('Admin')
  @Get()
  findAll() {
    //----> Retrieve all the users.
    return this.userService.findAll();
  }

  @Roles('Admin', 'User', 'Staff')
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    //----> Retrieve the user with the given id.
    return this.userService.findOne(id, req);
  }

  @Roles('Admin', 'User', 'Staff')
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    //----> Delete the user with the given id.
    return this.userService.remove(id, req);
  }
}
