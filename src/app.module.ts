import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONN_STRING'),
      }),
      inject: [ConfigService],
    })
    , ConfigModule.forRoot({ isGlobal: true }), ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
