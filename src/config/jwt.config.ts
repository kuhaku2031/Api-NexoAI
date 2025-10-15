import * as dotenv from 'dotenv';
dotenv.config();

export const jwtConstants = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET, // Replace with your own secret key
    signOptions: process.env.JWT_ACCESS_EXPIRES_IN // Token expiration time
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET, // Replace with your own secret key
    signOptions: process.env.JWT_REFRESH_EXPIRES_IN, // Token expiration time
  }
};