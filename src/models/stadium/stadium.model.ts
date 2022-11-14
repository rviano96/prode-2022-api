import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BaseModel } from "../../models/base.model";
import { MatchModel } from "../../models/match/match.model";

export class StadiumModel extends BaseModel{
    @ApiProperty()
    @IsNotEmpty()
    name?: string;

    @ApiProperty()
    matches?: MatchModel[]
}