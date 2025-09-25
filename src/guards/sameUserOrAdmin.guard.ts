import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';
import { UserInfo } from '../models/userInfo.model';
import { Role } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';

export class SameUserOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    //----> Get the request object.
    const req: Request = context.switchToHttp().getRequest<Request>(); //----> Retrieve all objects on request object.

    //----> get the user id from param.
    const userIdFromParam = req.params.userId;

    //----> Get the user id from the user object on request object.
    const { id: userIdFromContext, role } = req.user as UserInfo;

    //----> Check for same user via equality of the two user-ids.
    const sameUser = this.isSameUser(userIdFromContext, userIdFromParam);

    //----> Check for admin privilege.
    const isAdmin = role === Role.Admin;

    if (!sameUser && !isAdmin) {
      throw new ForbiddenException(
        StatusCodes.FORBIDDEN,
        "You don't have permission to view or perform this action!",
      );
    }

    //----> Not same user and not admin.
    return !(!sameUser && !isAdmin);
  }

  private isSameUser(userIdOne: string, userIdTwo: string) {
    return userIdOne.normalize() === userIdTwo.normalize();
  }
}
