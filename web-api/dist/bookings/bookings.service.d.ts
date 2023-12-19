import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { EnvironmentService } from 'src/environments/environments.service';
import { UsersService } from 'src/users/users.service';
import { PeriodsService } from 'src/periods/periods.service';
export declare class BookingsService {
    private readonly bookingRepository;
    private readonly serviceUser;
    private readonly serviceEnvironment;
    private readonly servicePeriod;
    constructor(bookingRepository: Repository<Booking>, serviceUser: UsersService, serviceEnvironment: EnvironmentService, servicePeriod: PeriodsService);
    create(bookingDto: CreateBookingDto): Promise<Booking[]>;
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
    getUnacceptedBookings(): Promise<Booking[]>;
}
