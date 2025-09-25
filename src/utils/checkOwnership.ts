import { Request } from 'express';
import { UserInfo } from '../models/userInfo.model';
import { Role } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

export function checkOwnership(req: Request, userIdFromResource: string) {
  //----> Get user id from context.
  const { id: userIdFromContext, role } = req.user as UserInfo;

  //----> Check for same user.
  const isSameUser =
    userIdFromContext.normalize() === userIdFromResource.normalize();

  //----> Check for admin privilege.
  const isAdmin = role === Role.Admin;

  //----> Not the same user and not an admin.
  if (!isSameUser && !isAdmin) {
    throw new ForbiddenException(
      "You don't have permission to perform this action.",
    );
  }

  //----> Either admin or same user.
  return !(!isAdmin && !isSameUser);
}
