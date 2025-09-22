export class CookieParam {
  static accessToken: string = 'accessToken';
  static refreshToken: string = 'refreshToken';
  static accessTokenPath: string = 'accessTokenPath';
  static refreshTokenPath: string = 'refreshTokenPath';
  static accessTokenMaxAge: number = 15 * 60 * 1000; //----> Access-token valid for 15 minutes.
  static refreshTokenMaxAge: number = 7 * 24 * 60 * 60 * 1000; //----> Refresh-token valid for one week (seven days).
}
