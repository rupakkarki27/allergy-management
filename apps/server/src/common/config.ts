import * as dotenv from 'dotenv';

dotenv.config();

export const Config = {
  API_VERSION: process.env.API_VERSION as unknown as number,
  APP_DOMAIN: process.env.APP_DOMAIN,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  GLOBAL_PREFIX: process.env.GLOBAL_PREFIX,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: parseInt(process.env.PORT),
  SWAGGER_ROUTE: process.env.SWAGGER_ROUTE,
  DATABASE_HOST: process.env.DATABASE_HOST,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_PORT: process.env.POSTGRES_PORT,
  POSTGRES_USER: process.env.POSTGRES_USER,
};
