import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateTypesEnvironmentDto } from './dto/create-types-environment.dto';
import { UpdateTypesEnvironmentDto } from './dto/update-types-environment.dto';
import { TypesEnvironmentService } from './types-environments.service';

@Controller('types-environments')
export class TypesEnvironmentsController {
  constructor(private readonly typesEnvironmentsService: TypesEnvironmentService) {}

  @Post()
  create(@Body() createTypesEnvironmentDto: CreateTypesEnvironmentDto) {
    return this.typesEnvironmentsService.create(createTypesEnvironmentDto);
  }

  @Get()
  findAll() {
    return this.typesEnvironmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesEnvironmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypesEnvironmentDto: UpdateTypesEnvironmentDto) {
    return this.typesEnvironmentsService.update(+id, updateTypesEnvironmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesEnvironmentsService.remove(+id);
  }
}
