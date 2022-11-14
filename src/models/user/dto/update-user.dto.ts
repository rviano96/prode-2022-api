import { PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { }


export class UpdateFisrtNameDto {
  @IsString()
  public readonly firstName: string;
}

export class UpdatePasswordDto {
  @IsString()
  public readonly password: string;
}