import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { StadiumModel } from "../stadium.model";

export class CreateStadiumDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
