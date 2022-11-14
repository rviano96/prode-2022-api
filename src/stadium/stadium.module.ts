import { Module } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { StadiumController } from './stadium.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stadium } from 'entities/stadium.entity';
import { UserModule } from 'user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Stadium]), UserModule],
  controllers: [StadiumController],
  providers: [StadiumService]
})
export class StadiumModule {}
