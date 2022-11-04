import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule,],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_CONN_STRING'),
      }),
      inject: [ConfigService],
    })
    , ConfigModule.forRoot({ isGlobal: true }), ItemsModule, UserModule, AuthModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
