import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentsModule } from './environments/environments.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { PeriodsModule } from './periods/periods.module';
import { TypesEnvironmentsModule } from './types-environments/types-environments.module';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'web_orm',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    EnvironmentsModule,
    FacilitiesModule,
    PeriodsModule,
    TypesEnvironmentsModule,
    BookingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
