import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { EnvironmentService } from 'src/environments/environments.service';
import { UsersService } from 'src/users/users.service';
import { PeriodsService } from 'src/periods/periods.service';
import { format } from 'date-fns';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
        private readonly serviceUser: UsersService,
        private readonly serviceEnvironment: EnvironmentService,
        private readonly servicePeriod: PeriodsService,
    ) { }

    async create(bookingDto: CreateBookingDto) {
        const { environmentId, userId, ...bookingData } = bookingDto;
        // Obtener el entorno y usuario asociados a la reserva
        const environment = await this.serviceEnvironment.findOne(environmentId);
        const user = await this.serviceUser.findOne(userId);
      
        // Obtener los períodos inicial y final
        const periodoInicial = await this.servicePeriod.periodStart(bookingData.startTime);
        const periodoFinal = await this.servicePeriod.periodEnd(bookingData.endTime);
      
        // Verificar si hay reservas existentes en el rango de tiempo
        const existingBookings = await this.bookingRepository.find({
          where: {
            environment: {id: environment.id},
            period: {
              id: Between(periodoInicial.id, periodoFinal.id),
            },
          },
        });
      
        // Si hay reservas existentes, cancelar la creación y devolver un mensaje apropiado
        if (existingBookings.length > 0) {
          throw new ConflictException('Ya existen reservas en el período de tiempo especificado.');
        }
      
        // Crear la reserva
        const bookings: Booking[] = [];
        for (let id = periodoInicial.id; id <= periodoFinal.id; id++) {
          const periodo = await this.servicePeriod.findOne(id);
          const booking = this.bookingRepository.create({
            ...bookingData,
            environment,
            user,
            period: periodo,
          });
          bookings.push(booking);
        }
      
        // Guardar las reservas
        return this.bookingRepository.save(bookings);
      }
      


    async findAll(): Promise<Booking[]> {
        const bookings = await this.bookingRepository.find({
            relations: ['user', 'period', 'environment'],
        });
        return bookings;
    }


    findOne(id: number): Promise<Booking> {
        return this.bookingRepository.findOne({ where: { id } });
    }

    async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        await this.bookingRepository.update(id, updateBookingDto);
        return this.bookingRepository.findOne({ where: { id } });
    }

    async remove(id: number): Promise<void> {
        await this.bookingRepository.delete(id);
    }

    async setActive({ id, isActive }: { id: number; isActive: boolean }): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({ where: { id } });
        if (!booking) {
            throw new NotFoundException('Booking not found');
        }
        booking.isActive = isActive;
        return this.bookingRepository.save(booking);
    }

    async setAccepted({ id, isAccepted }: { id: number; isAccepted: boolean }): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({ where: { id } });

        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        booking.isAccepted = isAccepted;

        return this.bookingRepository.save(booking);
    }

    async getBookingsByUser(userId: number): Promise<Booking[]> {
        const bookings = await this.bookingRepository.find({
            where: { user: { id: userId } },
            relations: ['user', 'period', 'environment'],
        });

        if (!bookings) {
            throw new NotFoundException('No bookings found for the user');
        }

        return bookings;
    }


    async getUnacceptedBookings(): Promise<Booking[]> {
        const unacceptedBookings = await this.bookingRepository.find({
            where: { isAccepted: false },
            relations: ['user', 'period', 'environment'],
        });

        return unacceptedBookings;
    }

}
