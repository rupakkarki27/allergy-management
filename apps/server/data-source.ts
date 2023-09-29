import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// using dotenv to access process.env
dotenv.config();

// this config object will be used by typeorm module and migrations scripts
export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  autoLoadEntities: true,
};

export default typeOrmModuleOptions;
