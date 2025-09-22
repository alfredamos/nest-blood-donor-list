import { Request, Response } from 'express';

export function getCookie(req: Request, cookieName: string): any {
  return req.cookies[cookieName];
}
