import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StadiumService } from './stadium.service';
import { CreateStadiumDto } from '../models/stadium/dto/create-stadium.dto';
import { UpdateStadiumDto } from '../models/stadium/dto/update-stadium.dto';
import { hasRoles } from '../auth/decorators/role.decorator';
import { Role } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { URL_STADIUM } from '../util/Constants';

@ApiTags('stadium')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(URL_STADIUM)
export class StadiumController {
  constructor(private readonly stadiumService: StadiumService) { }

  @hasRoles(Role.ADMIN)
  @Post('/bulk')
  bulkCreate(@Body() createStadiumDto: CreateStadiumDto[]) {
    return this.stadiumService.bulkCreate(createStadiumDto);
  }


  @hasRoles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.stadiumService.findAll();
  }

  @hasRoles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stadiumService.findOne(+id);
  }

  @hasRoles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStadiumDto: UpdateStadiumDto) {
    return this.stadiumService.update(+id, updateStadiumDto);
  }

  @hasRoles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stadiumService.remove(+id);
  }
}
