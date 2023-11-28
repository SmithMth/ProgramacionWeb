import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEnvironmentDto } from './dto/create-environment.dto';
import { UpdateEnvironmentDto } from './dto/update-environment.dto';
import { EnvironmentService } from './environments.service';
import { Environment } from './entities/environment.entity';

@Controller('environments')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentService) {}

  @Post()
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Get()
  findAll() {
    return this.environmentsService.findAll();
  }

  @Get('detalle') // Ruta: /environments/detalle
  async findAllWithDetails(): Promise<Environment[]> {
    return this.environmentsService.findAllWithDetails();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.environmentsService.findOne(+id);
  }

  @Patch()
  update(@Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.environmentsService.update(updateEnvironmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.environmentsService.remove(+id);
  }
}
