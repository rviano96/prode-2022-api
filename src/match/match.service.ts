import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity';
import { Team } from '../entities/team.entity';
import { MatchModel } from '../models/match/match.model';
import { from, map, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateMatchDto } from '../models/match/dto/create-match.dto';
import { UpdateMatchDto } from '../models/match/dto/update-match.dto';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private matchesRepository: Repository<Match>,
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>
  ) { }
  async create(createMatchDto: CreateMatchDto): Promise<MatchModel> {
    const awayTeam: Team | null = await this.teamsRepository.findOneBy({ id: createMatchDto.awayTeamId! })
    const homeTeam: Team | null = await this.teamsRepository.findOneBy({ id: createMatchDto.homeTeamId! })
    const stadium: Team | null = await this.teamsRepository.findOneBy({ id: createMatchDto.homeTeamId! })
    const result = await this.matchesRepository
      .createQueryBuilder()
      .insert()
      .into(Match)
      .values([{
        awayTeamId: awayTeam?.id!,
        homeTeamId: homeTeam?.id!,
        stadiumId: stadium?.id!,
        timeStart: createMatchDto.timeStart,
        code: createMatchDto.code,
        stage: createMatchDto.stage
      }]).execute()
    return new MatchModel()
  }

  async bulkCreate(createMatchDto: CreateMatchDto[]): Promise<MatchModel> {
    try {
      const matches = createMatchDto.map(elem => this.matchesRepository.create({
        awayTeamId: elem.awayTeamId!,
        homeTeamId: elem.homeTeamId!,
        stadiumId: elem.stadiumId!,
        timeStart: elem.timeStart,
        code: elem.code,
        stage: elem.stage
      }))
      
      const result = await this.matchesRepository.insert(matches)
      // const created = await this.matchesRepository.find(result.identifiers)
      return result.raw
    } catch (error) {
      console.log('error', error)
      throw new HttpException('INTERNAL SERVER ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // const awayTeam: Team | null = await this.teamsRepository.findOneBy({ id: createMatchDto.awayTeamId! })
    // const homeTeam: Team | null = await this.teamsRepository.findOneBy({ id: createMatchDto.homeTeamId! })
    // const stadium: Team | null = await this.teamsRepository.findOneBy({ id: createMatchDto.homeTeamId! })
    // const result = await this.matchesRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Match)
    //   .values([{
    //     awayTeamId: awayTeam?.id!,
    //     homeTeamId: homeTeam?.id!,
    //     stadium: stadium!,
    //     timeStart: createMatchDto.timeStart,
    //     code: createMatchDto.code,
    //     stage: createMatchDto.stage
    //   }]).execute()
    // console.log(result)
    return new MatchModel()
  }

  findAll(): Observable<MatchModel[]> {
    return from(this.matchesRepository.find({ loadRelationIds: true })).pipe(
      map((matches: Match[]) => {
        return matches
      }))
  }


  findOne(id: number) {
    return `This action returns a #${id} match`;
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  remove(id: number) {
    return `This action removes a #${id} match`;
  }
}
