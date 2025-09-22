// src/types/express.d.ts
import { Request } from 'express';
import { UserInfo } from '../models/userInfo.model';

declare global {
  namespace Express {
    interface Request {
      user: UserInfo; // Replace 'any' with your User interface/type
    }
  }
}
