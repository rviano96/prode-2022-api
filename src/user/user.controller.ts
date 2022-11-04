import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './schema/user.schema';
import { User as UserEntity } from './entities/user.entity'

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  getUserByEmail(@Query() query: any): Promise<User | null> {
    
    return this.userService.findOneByEmail(query);
  }
  @Post()
  registerUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity| HttpException> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(id);
  }

  // @Get(':id')
  // findOneByEmail(@Param('email') id: string) {
  //   return this.userService.findOneById(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
