import { Response } from 'express';

export function setCookie(
  cookieValue: any,
  cookieName: string,
  maxAge: number,
  path: string,
  res: Response,
): void {
  res.cookie(cookieName, cookieValue, {
    maxAge,
    path,
    httpOnly: true,
    secure: false,
  });
}
