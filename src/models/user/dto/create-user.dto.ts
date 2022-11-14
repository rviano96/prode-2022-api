import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { UserModel } from "../user.model";


export class CreateUserDto extends UserModel {
    @ApiProperty()
    password: string;
}
