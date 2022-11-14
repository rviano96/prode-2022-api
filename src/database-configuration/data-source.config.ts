import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();
const dataSourceOptions = () => {
  const env: string = configService.get<string>('ENVIRONMENT') || 'TEST'
  const defaultOptions: DataSourceOptions = {
    type: "postgres",
    url: configService.get<string>('DATABASE_URL'),
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/**/*.js"],
    migrationsTableName: "migrations",
  }
  let options: any = {}
  switch (env) {
    case 'PROD':
    case 'PRODUCTION':
      options = {
        ...defaultOptions, type: configService.get<string>('DATABASE_TYPE'),
        url: configService.get<string>('DATABASE_URL'),
        extra: {
          options: configService.get<string>('DB_ROUTING_ID'),
          application_name: "docs_simplecrud_typeorm"
        }
      }
      break;
    default:
      options = {
        ...defaultOptions,
        type: configService.get<string>('DATABASE_TYPE'),
        url: configService.get<string>('DATABASE_URL'),
        ssl: false,
      }
  }
  return options;
}

export default new DataSource(dataSourceOptions());