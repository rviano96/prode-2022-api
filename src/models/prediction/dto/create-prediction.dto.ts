import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { BaseModel } from "models/base.model";
import { PredictionModel } from "../prediction.model";

export class CreatePredictionDto extends BaseModel{
    @ApiProperty()
    @IsNotEmpty()
    awayGoals: number;

    @ApiProperty()
    @IsNotEmpty()
    homeGoals: number;

    @ApiProperty()
    @IsNotEmpty()
    matchId: number;
}
