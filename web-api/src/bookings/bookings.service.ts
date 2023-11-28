import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
    ) {}

    async create(createBookingDto: CreateBookingDto): Promise<Booking> {
        const booking = this.bookingRepository.create(createBookingDto);
        return this.bookingRepository.save(booking);
    }

    findAll(): Promise<Booking[]> {
        return this.bookingRepository.find();
    }

    findOne(id: number): Promise<Booking> {
        return this.bookingRepository.findOne({where: {id}});
    }

    async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
        await this.bookingRepository.update(id, updateBookingDto);
        return this.bookingRepository.findOne({where: {id}});
    }

    async remove(id: number): Promise<void> {
        await this.bookingRepository.delete(id);
    }
}
