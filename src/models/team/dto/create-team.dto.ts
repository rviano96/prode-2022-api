import { ApiProperty } from "@nestjs/swagger";
import { Trim } from "class-sanitizer";
import { IsNotEmpty } from "class-validator";
import { TeamModel } from "../team.model";

export class CreateTeamDto{
    @ApiProperty()
    @IsNotEmpty()
    @Trim()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    flag?: string;

    @ApiProperty()
    @IsNotEmpty()
    group: string;

    @ApiProperty()
    @IsNotEmpty()
    acronym?: string;

}
