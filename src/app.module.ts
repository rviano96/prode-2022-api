import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { DatabaseConfigurationService } from './database-configuration/database-configuration.service';
import { TeamModule } from './team/team.module';
import { MatchModule } from './match/match.module';
import { PredictionModule } from './prediction/prediction.module';
import { AuthModule } from './auth/auth.module';
import { StadiumModule } from './stadium/stadium.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigurationService,
      imports: [ConfigModule]
    }),
    UserModule,
    TeamModule,
    MatchModule,
    PredictionModule,
    AuthModule,
    StadiumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
