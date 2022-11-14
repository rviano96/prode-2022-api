import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../entities/team.entity';
import { UserModule } from 'user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]), UserModule],
  exports: [TypeOrmModule],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
