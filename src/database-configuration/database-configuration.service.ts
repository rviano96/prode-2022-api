import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmDataSourceFactory, TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseConfigurationService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) { }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        const env: string = this.configService.get<string>('ENVIRONMENT') || 'TEST'
        const defaultOptions: TypeOrmModuleOptions = {
            autoLoadEntities: true,
            synchronize: false,
            logging: false,
            entities: ["dist/entities/*.js"],
            migrations: ["dist/migrations/**/*.js"],
            ssl: true,
            migrationsTableName: "migrations",
        }
        let options: any = {}
        switch (env) {
            case 'PROD':
            case 'PRODUCTION':
                options = {
                    ...defaultOptions, type: this.configService.get<string>('DATABASE_TYPE'),
                    url: this.configService.get<string>('DATABASE_URL'),
                    extra: {
                        options: this.configService.get<string>('DB_ROUTING_ID'),
                        application_name: "docs_simplecrud_typeorm"
                    }
                }
                break;
            default:
                options = {
                    ...defaultOptions,
                    type: this.configService.get<string>('DATABASE_TYPE'),
                    url: this.configService.get<string>('DATABASE_URL'),
                    ssl: false,
                    synchronize: false,
                }
        }
        return options;
    }

}

