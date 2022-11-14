import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BaseModel } from "models/base.model";
import { MatchModel } from "../match.model";

export class CreateMatchDto extends BaseModel {
    @ApiProperty()
    @IsNotEmpty()
    stage?: string;

    @ApiProperty()
    @IsNotEmpty()
    code?: string;

    @IsNotEmpty()
    @ApiProperty()
    timeStart?: Date;

    //@IsNotEmpty()
    @ApiProperty()
    result?: string;

    @IsNotEmpty()
    @ApiProperty()
    homeTeamId?: number;

    @IsNotEmpty()
    @ApiProperty()
    awayTeamId?: number;

    @IsNotEmpty()
    @ApiProperty()
    stadiumId?: number;

    //@IsNotEmpty()
    @ApiProperty()
    homeGoals?: number;

    //@IsNotEmpty()
    @ApiProperty()
    awayGoals?: number;
}
