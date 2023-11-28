import { Module } from '@nestjs/common';
import { EnvironmentsController } from './environments.controller';
import { EnvironmentService } from './environments.service';
import { Environment } from './entities/environment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesEnvironmentsModule } from 'src/types-environments/types-environments.module';
import { FacilitiesModule } from 'src/facilities/facilities.module';

@Module({
  imports: [
    FacilitiesModule,
    TypesEnvironmentsModule,
    TypeOrmModule.forFeature([Environment])
  ],
  controllers: [EnvironmentsController],
  providers: [EnvironmentService],
  exports: [EnvironmentService]
})
export class EnvironmentsModule {}
