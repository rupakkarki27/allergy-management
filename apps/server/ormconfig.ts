import * as dotenv from 'dotenv';

dotenv.config();

export = {
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
