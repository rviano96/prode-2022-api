import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity';
import { Team } from 'entities/team.entity';
import { Stadium } from 'entities/stadium.entity';
import { UserModule } from 'user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Team, Stadium]), UserModule],
  exports: [TypeOrmModule],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule { }
