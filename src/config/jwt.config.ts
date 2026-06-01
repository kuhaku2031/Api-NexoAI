import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: (process.env.JWT_ACCESS_EXPIRES_IN || '1h') as any,
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
  },
};
