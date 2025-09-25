import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { Roles } from '../decorators/role.decorator';
import { SameUserOrAdminGuard } from '../guards/sameUserOrAdmin.guard';

@Controller('tokens')
export class UsersController {
  constructor(private readonly tokenService: TokenService) {}

  @Roles('admin')
  @UseGuards(SameUserOrAdminGuard)
  @Delete('all/delete-all/:userId')
  removeAll(@Param('userId') userId: string) {
    return this.tokenService.removeAllInvalidTokens(userId);
  }
}
