import { Config } from './src/common/config';

export = {
  type: 'postgres',
  host: Config.DATABASE_HOST,
  port: Number(Config.POSTGRES_PORT),
  username: Config.POSTGRES_USER,
  password: Config.POSTGRES_PASSWORD,
  database: Config.POSTGRES_DB,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/migration/*{.ts,.js}'],
  autoLoadEntities: true,
};
