import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsService {
    private bookingRepository;
    constructor(bookingRepository: Repository<Booking>);
    create(createBookingDto: CreateBookingDto): Promise<Booking>;
    findAll(): Promise<Booking[]>;
    findOne(id: number): Promise<Booking>;
    update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking>;
    remove(id: number): Promise<void>;
    setActive({ id, isActive }: {
        id: number;
        isActive: boolean;
    }): Promise<Booking>;
    setAccepted({ id, isAccepted }: {
        id: number;
        isAccepted: boolean;
    }): Promise<Booking>;
    getBookingsByUser(userId: number): Promise<Booking[]>;
}
