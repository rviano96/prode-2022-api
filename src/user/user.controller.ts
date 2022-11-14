import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ClassSerializerInterceptor, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../models/user/dto/create-user.dto';
import { UpdateFisrtNameDto, UpdateUserDto } from '../models/user/dto/update-user.dto';
import { User, Role } from '../entities/user.entity';
import { Request } from 'express';
import { hasRoles } from 'auth/decorators/role.decorator';
import { RolesGuard } from 'auth/guards/roles.guard';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { UserModel } from 'models/user/user.model';
import { ApiTags } from '@nestjs/swagger';
import { URL_USER } from 'util/Constants';

@ApiTags('user')
@Controller(URL_USER)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  private register(@Body() body: UserModel){
    return this.userService.register(body);
  }

  @hasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // @Put('name')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(ClassSerializerInterceptor)
  // private updateName(@Body() body: UpdateFisrtNameDto, @Req() req: Request): Promise<User> {
  //   return this.userService.updateName(body, req);
  // }
}
