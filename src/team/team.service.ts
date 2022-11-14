import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from 'entities/team.entity';
import { TeamModel } from 'models/team/team.model';
import { from, map, Observable } from 'rxjs';
import { Repository, UpdateResult } from 'typeorm';
import { CreateTeamDto } from '../models/team/dto/create-team.dto';
import { UpdateTeamDto } from '../models/team/dto/update-team.dto';

@Injectable()
export class TeamService {

  constructor(
    @InjectRepository(Team)
    private teamsRepository: Repository<Team>,
  ) { }

  async create(createTeamDto: CreateTeamDto): Promise<TeamModel> {
    const { name } = createTeamDto;

    let team: Team | null = await this.teamsRepository.findOne({ where: { name } });

    if (team) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    return await this.teamsRepository.save(createTeamDto);
  }

  bulkCreate(createTeamDto: CreateTeamDto[]): Observable<TeamModel[]> {
    return from(this.teamsRepository.save(createTeamDto, { transaction: true })).pipe(
      map((teams: Team[]) => teams)
    );
  }

  findAll(): Observable<TeamModel[]> {
    return from(this.teamsRepository.find()).pipe(
      map((teams: Team[]) => {
        return teams
      }))
  }

  findOne(id: number): Observable<TeamModel> {
    return from(this.teamsRepository.findOneBy({ id })).pipe(
      map((team: Team) => (team))
    )
  }

  update(id: number, updateTeamDto: UpdateTeamDto): Observable<TeamModel> {
    const result = from(this.teamsRepository.update(id, updateTeamDto)).pipe(
      map((team: UpdateResult) => {
        return team.raw[0]
      })
    );
    return this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
