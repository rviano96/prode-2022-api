import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { User } from "user/entities/user.entity";

//Not sure if should extends from User...
export class CreateUserDto extends User{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @Length(8, 20)
    password: string;
}
