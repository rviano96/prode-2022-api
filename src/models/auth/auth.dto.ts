import { Trim } from "class-sanitizer";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @Trim()
    @IsEmail()
    public readonly email: string;

    @IsString()
    public readonly password: string;
}

export class JwtResponseDto {
    @IsString()
    public access_token: string;

}