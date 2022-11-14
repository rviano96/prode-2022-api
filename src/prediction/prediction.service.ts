import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'entities/match.entity';
import { Prediction } from 'entities/prediction.entity';
import { User } from 'entities/user.entity';
import { PredictionModel } from 'models/prediction/prediction.model';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { UserService } from 'user/user.service';
import { CreatePredictionDto } from '../models/prediction/dto/create-prediction.dto';
import { UpdatePredictionDto } from '../models/prediction/dto/update-prediction.dto';

@Injectable()
export class PredictionService {
  constructor(
    @InjectRepository(Prediction)
    private predictionsRepository: Repository<Prediction>
  ) { }
  async create(createPredictionDto: CreatePredictionDto, userId: number): Promise<PredictionModel> {
    try {
      const { matchId, awayGoals, homeGoals } = createPredictionDto
      const prediction = await this.predictionsRepository.create({
        matchId, awayGoals, homeGoals, userId: userId
      })
      const result = await this.predictionsRepository.insert(prediction)
      return result.raw
    }
    catch (error) {

      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }

  }

  async findAll(): Promise<PredictionModel[]> {
    try {
      const predictions = await this.predictionsRepository.find()
      return predictions
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }

  }

  async findOne(id: number): Promise<PredictionModel>  {
    try {
      const predictions = await this.predictionsRepository.findOneByOrFail({id})
      return predictions
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }
}
