import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "../../models/base.model";
import { StadiumModel } from "../../models/stadium/stadium.model";
import { TeamModel } from "../../models/team/team.model";

export class MatchModel extends BaseModel{
    @ApiProperty()
    stage?: string;

    @ApiProperty()
    code?: string;

    @ApiProperty()
    timeStart?: Date;

    @ApiProperty()
    result?: string;

    @ApiProperty()
    homeTeam?: TeamModel;

    @ApiProperty()
    awayTeam?: TeamModel;

    @ApiProperty()
    stadium?: StadiumModel;

    @ApiProperty()
    homeGoals?: number;

    @ApiProperty()
    awayGoals?: number;
}