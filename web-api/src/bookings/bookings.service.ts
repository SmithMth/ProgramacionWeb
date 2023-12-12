import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { EnvironmentService } from 'src/environments/environments.service';
import { UsersService } from 'src/users/users.service';
import { PeriodsService } from 'src/periods/periods.service';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private readonly bookingRepository: Repository<Booking>,
    ) { }

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const { environment, user, period, ...bookingData } = createBookingDto;
        // Crea la reserva y asigna las entidades relacionadas
        const booking = this.bookingRepository.create({
            ...bookingData,
            environment: environment,
            user: user,
            period: period,
        });
        return this.bookingRepository.save(booking);
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
