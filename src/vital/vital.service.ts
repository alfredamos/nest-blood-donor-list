/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVitalDto } from './dto/create-vital.dto';
import { UpdateVitalDto } from './dto/update-vital.dto';
import { Vital } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { checkOwnership } from '../utils/checkOwnership';
import { type Request} from "express"
import { ResponseMessage } from '../utils/responseMessage';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class VitalService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVitalDto: CreateVitalDto) {
    return this.prisma.vital.create({
      data: { ...(createVitalDto as unknown as Vital) },
    });
  }

  async findAll() {
    return this.prisma.vital.findMany({
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
      },});
  }

  async findAllByUserId(userId: string) {
    //----> Fetch all vitals by user-id.
    return this.prisma.vital.findMany({ where: { userId },
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
      }, });
  }

  async findOne(id: string, req: Request) {
    //----. Fetch the vital with the given id.
    const vital = await this.getOneVital(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, vital.userId);
  }

  async update(id: string, updateVitalDto: UpdateVitalDto, req: Request) {
    //----> Check for existence of vital with the given id.
    const vital = await this.getOneVital(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, vital.userId);

    //----> Update in the database the edited blood-stat with the given id.
    await this.prisma.vital.update({
      where: { id },
      data: { ...updateVitalDto },
    });

    //----> Send back the response.
    return new ResponseMessage(
      'Vital has been updated successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async remove(id: string, req: Request) {
    //----> Check for existence of vital with the given id.
    const vital = await this.getOneVital(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, vital.userId);

    //----> Delete the vital with the given id.
    await this.prisma.vital.delete({ where: { id } });

    //----> Send back the response.
    return new ResponseMessage(
      'Vital has been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async removeAllByUserId(userId: string) {
    //----> Delete all vitals by user-id.
    const allDeleteByUserId = await this.prisma.vital.deleteMany({
      where: { userId },
    });

    if (!allDeleteByUserId.count) {
      throw new NotFoundException(
        StatusCodes.NOT_FOUND,
        'Vitals cannot be deleted!',
      );
    }

    //----> Send back the response.
    return new ResponseMessage(
      'Vitals have all been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async removeAll() {
    //----> Fetch all vitals.
    const allVitals = await this.prisma.vital.findMany({});

    //----> Collect all vitals ids into a map.
    const vitalIds = allVitals.map((d) => d.id);

    //----> Delete all vitals.
    const allDeleted = await this.prisma.vital.deleteMany({
      where: { id: { in: vitalIds } },
    });

    if (!allDeleted.count) {
      throw new NotFoundException(
        StatusCodes.NOT_FOUND,
        'Vital cannot be deleted!',
      );
    }

    //----> Send back the response.
    return new ResponseMessage(
      'Vitals have all been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  private async getOneVital(id: string) {
    //----> Fetch the vital with given id from database.
    const vital = await this.prisma.vital.findUnique({
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
    if (!vital) {
      throw new NotFoundException(
        `Vitals with id ${id} not found in the database`,
      );
    }

    //----> Send back the result.
    return vital;
  }
}
