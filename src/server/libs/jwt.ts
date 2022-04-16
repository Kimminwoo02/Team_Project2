import jwt, { SignOptions } from 'jsonwebtoken';
import Configs from '../configs';

const { SECRET_CODE, APP_NAME } = Configs;

export type JWTPayload = { [key: string]: any };

const JsonWebToken = {
  encodeToken(payload: JWTPayload, options?: SignOptions) {
    const signOptions = {
      issuer: APP_NAME,
      expiresIn: '7d', // default
      ...options,
    } as SignOptions;

    return jwt.sign(payload as object, SECRET_CODE, signOptions);
  },

  decodeToken(token: string) {
    return jwt.verify(token, SECRET_CODE);
  },

  generateOauth2Token(uid: string) {
    const accessToken = this.encodeToken(
      { uid },
      {
        subject: 'refresh_token',
        expiresIn: '1h',
      }
    );

    const refreshToken = this.encodeToken(
      { uid },
      {
        subject: 'refresh_token',
        expiresIn: '14d',
      }
    );

    return {
      accessToken,
      refreshToken,
    };
  },
};

export default JsonWebToken;
