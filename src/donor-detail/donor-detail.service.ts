import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDonorDetailDto } from './dto/create-donor-detail.dto';
import { UpdateDonorDetailDto } from './dto/update-donor-detail.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { checkOwnership } from '../utils/checkOwnership';
import { ResponseMessage } from '../utils/responseMessage';
import { StatusCodes } from 'http-status-codes';
import { DonorDetail } from '@prisma/client';

@Injectable()
export class DonorDetailService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDonorDetailDto: CreateDonorDetailDto) {
    return this.prisma.donorDetail.create({
      data: { ...(createDonorDetailDto as unknown as DonorDetail) },
    });
  }

  async findAll() {
    return this.prisma.donorDetail.findMany({
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

  async findAllByUserId(userId: string) {
    //----> Fetch all donor-details by user-id.
    return this.prisma.donorDetail.findMany({
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
  }

  async findOne(id: string, req: Request) {
    //----. Fetch the donor-detail with the given id.
    const donorDetail = await this.getOneDonorDetail(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, donorDetail.userId);
  }

  async update(
    id: string,
    updateDonorDetailDto: UpdateDonorDetailDto,
    req: Request,
  ) {
    //----> Check for existence of donor-detail with the given id.
    const donorDetail = await this.getOneDonorDetail(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, donorDetail.userId);

    //----> Update in the database the edited donor-detail with the given id.
    await this.prisma.donorDetail.update({
      where: { id },
      data: { ...updateDonorDetailDto },
    });

    //----> Send back the response.
    return new ResponseMessage(
      'DonorDetail has been updated successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async remove(id: string, req: Request) {
    //----> Check for existence of donor-detail with the given id.
    const donorDetail = await this.getOneDonorDetail(id);

    //----> Check for same user or admin privilege.
    checkOwnership(req, donorDetail.userId);

    //----> Delete the donor-detail with the given id.
    await this.prisma.donorDetail.delete({ where: { id } });

    //----> Send back the response.
    return new ResponseMessage(
      'DonorDetail has been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async removeAllByUserId(userId: string) {
    //----> Delete all donor-details by user-id.
    const allDeleteByUserId = await this.prisma.donorDetail.deleteMany({
      where: { userId },
    });

    if (!allDeleteByUserId.count) {
      throw new NotFoundException(
        StatusCodes.NOT_FOUND,
        'Donor-details cannot be deleted!',
      );
    }

    //----> Send back the response.
    return new ResponseMessage(
      'Donor-details have all been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  async removeAll() {
    //----> Fetch all donor-details.
    const allDonorDetails = await this.prisma.donorDetail.findMany({});

    //----> Collect all donor-details ids into a map.
    const donorDetailIds = allDonorDetails.map((d) => d.id);

    //----> Delete all donor-details.
    const allDeleted = await this.prisma.donorDetail.deleteMany({
      where: { id: { in: donorDetailIds } },
    });

    if (!allDeleted.count) {
      throw new NotFoundException(
        StatusCodes.NOT_FOUND,
        'Donor-details cannot be deleted!',
      );
    }

    //----> Send back the response.
    return new ResponseMessage(
      'Donor-details have all been deleted successfully!',
      'success',
      StatusCodes.OK,
    );
  }

  private async getOneDonorDetail(id: string) {
    //----> Fetch the donor-detail with given id from database.
    const donorDetail = await this.prisma.donorDetail.findUnique({
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
    if (!donorDetail) {
      throw new NotFoundException(
        `Donor details with id ${id} not found in the database`,
      );
    }

    //----> Send back the result.
    return donorDetail;
  }
}
