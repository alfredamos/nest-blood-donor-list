import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toUserDto } from '../utils/toUserDto';
import { ResponseMessage } from '../utils/responseMessage';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { checkOwnership } from '../utils/checkOwnership';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    //----> Get all users from database.
    const users = await this.prisma.user.findMany({});

    //----> send back the response as user-dtos.
    return users.map((user) => toUserDto(user));
  }

  async findOne(id: string, req: Request) {
    //----> Get the user with the given id from database.
    const user = await this.getOneUser(id);

    //----> Check for ownership or admin privilege.
    checkOwnership(req, id);

    //----> Send back the result as user-dto.
    return toUserDto(user);
  }

  async remove(id: string, req: Request) {
    //----> Get the user with the given id from database.
    await this.getOneUser(id);

    //----> Check for ownership or admin privilege.
    checkOwnership(req, id);

    //----> Delete the user with given id from database.
    await this.prisma.user.delete({ where: { id } });

    //----> send back the response.
    return new ResponseMessage(
      'User has been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  private async getOneUser(id: string) {
    //----> Get the user with the given id from database.
    const user = await this.prisma.user.findUnique({ where: { id } });

    //----> Check for null user.
    if (!user) {
      throw new NotFoundException(
        `User with id ${id} not found in the database`,
      );
    }

    //----> Send back the result.
    return user;
  }
}
