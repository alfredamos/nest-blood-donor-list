import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Perform authentication logic here (e.g., verify JWT token)
    // Replace with actual user data
    req.user = {
      id: 'id',
      name: 'exampleUser',
      role: 'Admin',
      email: 'alfredamos@gmail.com',
    };
    next();
  }
}
