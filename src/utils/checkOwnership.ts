import { Request } from 'express';
import { UserInfo } from '../models/userInfo.model';
import { Role } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export function checkOwnership(req: Request, idFromParam: string) {
  //----> Get user id from context.
  const { id: idFromContext, role } = req.user as UserInfo;

  //----> Check for same user.
  const isSameUser = idFromContext.normalize() === idFromParam.normalize();

  //----> Check for admin privilege.
  const isAdmin = role === Role.Admin;

  //----> Not the same user and not an admin.
  if (!isSameUser && !isAdmin) {
    throw new ForbiddenException(
      StatusCodes.FORBIDDEN,
      "You don't have permission to perform this action.",
    );
  }
}
