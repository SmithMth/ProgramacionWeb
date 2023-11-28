import { Module } from '@nestjs/common';
import { TypesEnvironmentsController } from './types-environments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesEnvironment } from './entities/types-environment.entity';
import { TypesEnvironmentService } from './types-environments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypesEnvironment])
  ],
  controllers: [TypesEnvironmentsController],
  providers: [TypesEnvironmentService],
  exports: [TypesEnvironmentService]
})
export class TypesEnvironmentsModule {}
