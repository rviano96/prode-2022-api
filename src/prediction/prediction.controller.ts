import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PredictionService } from './prediction.service';
import { CreatePredictionDto } from '../models/prediction/dto/create-prediction.dto';
import { UpdatePredictionDto } from '../models/prediction/dto/update-prediction.dto';
import { hasRoles } from '../auth/decorators/role.decorator';
import { Role } from '../entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { URL_PREDICTION } from '../util/Constants';

@ApiTags('prediction')
@Controller(URL_PREDICTION)
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) { }


  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createPredictionDto: CreatePredictionDto, @Req() req: any) {
    return this.predictionService.create(createPredictionDto, req.user.id);
  }

  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.predictionService.findAll();
  }

  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.predictionService.findOne(+id);
  }

  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePredictionDto: UpdatePredictionDto) {
    return this.predictionService.update(+id, updatePredictionDto);
  }

  @hasRoles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.predictionService.remove(+id);
  }
}
