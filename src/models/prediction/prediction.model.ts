import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Prediction } from "entities/prediction.entity";
import { BaseModel } from "models/base.model";
import { MatchModel } from "models/match/match.model";
import { UserModel } from "models/user/user.model";

export class PredictionModel extends BaseModel {

    @ApiProperty()
    @IsNotEmpty()
    user?: UserModel;

    @ApiProperty()
    @IsNotEmpty()
    awayGoals?: number;

    @ApiProperty()
    @IsNotEmpty()
    homeGoals?: number;

    @ApiProperty()
    @IsNotEmpty()
    match?: MatchModel;

    // constructor(prediction: Prediction) {
    //     const { id,
    //         createdAt,
    //         deletedAt,
    //         updatedAt,
    //         userId: user,
    //         matchId: match,
    //         homeGoals,
    //         awayGoals, } = prediction
    //     super(id, createdAt, deletedAt, updatedAt)
    //     this.user = user
    //     this.match = match
    //     this.homeGoals = homeGoals
    //     this.awayGoals = awayGoals
    // }
}