import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Prediction } from "entities/prediction.entity";
import { Role } from "entities/user.entity";
import { BaseModel } from "models/base.model";
import { PredictionModel } from "models/prediction/prediction.model";

export class UserModel extends BaseModel{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    password?: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    lastLoginAt: Date | null;

    @ApiProperty()
    role: Role;

    @ApiProperty()
    predictions?: Prediction[];
}

