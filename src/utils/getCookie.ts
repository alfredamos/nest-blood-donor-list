import { Request } from 'express';

export function getCookie(req: Request): any {
  console.log('In get-cookie, cookies: ', req?.cookies?.acessToken);
  return req?.cookies?.accessToken;
}
