import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Config } from './src/common/config';

// this config object will be used by typeorm module and migrations scripts
export const typeOrmModuleOptions: TypeOrmModuleOptions = {
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

// exporting the DataSource object for migration cli
const dataSource = new DataSource(typeOrmModuleOptions as DataSourceOptions);

export default dataSource;
