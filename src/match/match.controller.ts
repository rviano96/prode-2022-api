import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from '../models/match/dto/create-match.dto';
import { UpdateMatchDto } from '../models/match/dto/update-match.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../entities/user.entity';
import { hasRoles } from '../auth/decorators/role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { URL_MATCH } from '../util/Constants';

@ApiTags('match')
@UseGuards(JwtAuthGuard, RolesGuard)
@hasRoles(Role.ADMIN)
@Controller(URL_MATCH)
export class MatchController {
  constructor(private readonly matchService: MatchService) { }

  @Post('')
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

  @Post('/bulk')
  bulkCreate(@Body() createMatchDto: CreateMatchDto[]) {
    return this.matchService.bulkCreate(createMatchDto);
  }

  @hasRoles(Role.ADMIN, Role.USER)
  @Get()
  findAll() {
    return this.matchService.findAll();
  }

  @hasRoles(Role.ADMIN, Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchService.remove(+id);
  }
}
