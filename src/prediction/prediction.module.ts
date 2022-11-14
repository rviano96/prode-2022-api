import { Module } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { PredictionController } from './prediction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prediction } from '../entities/prediction.entity';
import { Match } from 'entities/match.entity';
import { User } from 'entities/user.entity';
import { UserModule } from 'user/user.module';
import { MatchModule } from 'match/match.module';

@Module({
  imports: [TypeOrmModule.forFeature([Prediction]), UserModule, MatchModule],
  exports: [TypeOrmModule],
  controllers: [PredictionController],
  providers: [PredictionService]
})
export class PredictionModule {}
