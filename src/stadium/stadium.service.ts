import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stadium } from 'entities/stadium.entity';
import { StadiumModel } from 'models/stadium/stadium.model';
import { from, map, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateStadiumDto } from '../models/stadium/dto/create-stadium.dto';
import { UpdateStadiumDto } from '../models/stadium/dto/update-stadium.dto';

@Injectable()
export class StadiumService {
  constructor(
    @InjectRepository(Stadium)
    private stadiumsRepository: Repository<Stadium>,
  ) { }


  bulkCreate(createStadiumDto: CreateStadiumDto[]): Observable<StadiumModel[]> {
    return from(this.stadiumsRepository.save(createStadiumDto, { transaction: false })).pipe(
      map((stadiums: StadiumModel[]) => stadiums)
    );
  }

  findAll(): Observable<StadiumModel[]> {
    return from(this.stadiumsRepository.find()).pipe(
      map((stadiums: StadiumModel[]) => stadiums)
    );
  }

  findOne(id: number): Observable<StadiumModel> {
    return from(this.stadiumsRepository.findOneBy({ id })).pipe(
      map((stadium: Stadium) => stadium)
    );
  }

  update(id: number, updateStadiumDto: UpdateStadiumDto): Observable<StadiumModel> {
    from(this.stadiumsRepository.update(id, updateStadiumDto)).pipe(
      map((stadium: UpdateResult) => {
        return stadium.raw[0]
      })
    );
    return this.findOne(id)
  }

  remove(id: number): Observable<DeleteResult> {
    return from(this.stadiumsRepository.delete({ id }));
  }
}
