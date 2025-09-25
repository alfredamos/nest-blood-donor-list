import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBloodStatDto } from './dto/create-blood-stat.dto';
import { UpdateBloodStatDto } from './dto/update-blood-stat.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseMessage } from '../utils/responseMessage';
import { StatusCodes } from 'http-status-codes';
import { Request } from 'express';
import { checkOwnership } from '../utils/checkOwnership';

@Injectable()
export class BloodStatService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBloodStatDto: CreateBloodStatDto) {
    //----> Get the user-id.
    const userId = createBloodStatDto.userId;
    const bloodStat = await this.findOneByUserId(userId);

    //----> Check for existence of blood-stat for this user.
    if (bloodStat) {
      throw new BadRequestException('You already have blood-stat!');
    }
    return this.prisma.bloodStat.create({
      data: { ...createBloodStatDto },
    });
  }

  async findAll() {
    return this.prisma.bloodStat.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            gender: true,
            address: true,
            age: true,
          },
        },
      },
    });
  }

  async findOne(id: string, req: Request) {
    //----> Fetch the blood-stat with the given id.
    const bloodStat = await this.getOneBloodStat(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, bloodStat.userId);

    //----> Send back the response.
    return bloodStat;
  }

  async findOneByUserId(userId: string) {
    //----> Fetch the blood-stat by user-id
    return this.getOneBloodStatByUserId(userId);
  }

  async update(
    id: string,
    updateBloodStatDto: UpdateBloodStatDto,
    req: Request,
  ) {
    //----> Check for existence of blood-stat with the given id.
    const bloodStat = await this.getOneBloodStat(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, bloodStat.userId);

    //----> Update in the database the edited blood-stat with the given id.
    await this.prisma.bloodStat.update({
      where: { id },
      data: { ...updateBloodStatDto },
    });

    //----> Send back the response.
    return new ResponseMessage(
      'BloodStat has been updated successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async remove(id: string, req: Request) {
    //----> Check for existence of blood-stat with the given id.
    const bloodStat = await this.getOneBloodStat(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, bloodStat.userId);

    //----> Delete the blood-stat with the given id.
    await this.prisma.bloodStat.delete({ where: { id } });

    //----> Send back the response.
    return new ResponseMessage(
      'BloodStat has been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async removeOneByUserId(userId: string) {
    //----> Fetch the blood-stat by user-id
    await this.getOneBloodStatByUserId(userId);

    //----> Delete blood-stat by user-id.
    const oneDeleted = await this.prisma.bloodStat.delete({
      where: { userId },
    });

    //----> Check for failure to delete.
    if (!oneDeleted) {
      throw new NotFoundException(
        StatusCodes.NOT_FOUND,
        "BloodStat can't be deleted successfully!",
      );
    }

    //----> Send back the response.
    return new ResponseMessage(
      'Blood-stat has been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async removeAll() {
    //----> Fetch all blood-stats.
    const allBloodStats = await this.prisma.bloodStat.findMany({});

    //----> Collect all blood-stats in an array.
    const allBloodStatIds = allBloodStats.map((bloodStat) => bloodStat.id);

    //----> Delete all blood-stats.
    const allDeleted = await this.prisma.bloodStat.deleteMany({
      where: {
        id: {
          in: allBloodStatIds,
        },
      },
    });

    //----> Check for failure to delete.
    if (!allDeleted.count) {
      throw new NotFoundException(
        StatusCodes.NOT_FOUND,
        'BloodStat cannot be deleted!',
      );
    }

    //----> Send back the response.
    return new ResponseMessage(
      'All blood-stats have been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  private async getOneBloodStat(id: string) {
    //----> Fetch the blood-stat with given id from database.
    const bloodStat = await this.prisma.bloodStat.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            gender: true,
            address: true,
            age: true,
          },
        },
      },
    });

    //----> Check for null value.
    if (!bloodStat) {
      throw new NotFoundException(
        `Blood Stats with id: ${id} not found in the database`,
      );
    }

    //----> Send back the result.
    return bloodStat;
  }

  private async getOneBloodStatByUserId(userId: string) {
    //----> Fetch the blood-stat with given id from database.
    const bloodStat = await this.prisma.bloodStat.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            gender: true,
            address: true,
            age: true,
          },
        },
      },
    });

    //----> Check for null value.
    if (!bloodStat) {
      throw new NotFoundException(
        `Blood Stats with userId : ${userId} not found in the database`,
      );
    }

    //----> Send back the result.
    return bloodStat;
  }
}
