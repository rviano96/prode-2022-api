import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

//Not sure if should extends from User...
export class CreateUserDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @Length(8, 20)
    @IsNotEmpty()
    password: string;
}
