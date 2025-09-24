import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserInfo } from '../models/userInfo.model';
import { Role } from '@prisma/client';

export class SameUserOrAdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getClass(),
      context.getHandler(),
    ]);

    //----> Public resources.
    if (isPublic) return true;

    //----> Get the request object.
    const req: Request = context.switchToHttp().getRequest<Request>(); //----> Retrieve all objects on request object.

    //----> get the user id from param.
    const useridFromParam = req.params.userId;

    //----> Get the user id from the user object on request object.
    const { id: userIdFromContext, role } = req.user as UserInfo;

    //----> Check for same user via equality of the two user-ids.
    const sameUser = this.isSameUser(userIdFromContext, useridFromParam);
    console.log('In same-user-or-admin, sameUser : ', sameUser);

    //----> Check for admin privilege.
    const isAdmin = role === Role.Admin;
    console.log('In same-user-or-admin, isAdmin : ', isAdmin);

    //----> Not same user and not admin.
    return !(!sameUser && !isAdmin);
  }

  private isSameUser(userIdOne: string, userIdTwo: string) {
    return userIdOne.normalize() === userIdTwo.normalize();
  }
}
