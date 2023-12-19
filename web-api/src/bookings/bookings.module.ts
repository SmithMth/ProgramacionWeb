import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { EnvironmentsModule } from 'src/environments/environments.module';
import { UsersModule } from 'src/users/users.module';
import { PeriodsModule } from 'src/periods/periods.module';
import { TypesEnvironmentsModule } from 'src/types-environments/types-environments.module';

@Module({
  imports: [
    UsersModule,
    EnvironmentsModule,
    PeriodsModule,
    TypeOrmModule.forFeature([Booking])
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService]
})
export class BookingsModule {}
