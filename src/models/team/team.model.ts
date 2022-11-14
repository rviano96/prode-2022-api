import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsNotEmpty } from "class-validator";
import { BaseModel } from "models/base.model";
import { MatchModel } from "models/match/match.model";

export class TeamModel extends BaseModel {

    @ApiProperty()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiProperty()
    flag?: string;

    @ApiProperty()
    @IsNotEmpty()
    group: string;

    @ApiProperty()
    acronym?: string;

    @ApiProperty()
    matches?: MatchModel[] | undefined

}