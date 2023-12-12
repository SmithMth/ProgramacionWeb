import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(createBookingDto: CreateBookingDto): Promise<import("./entities/booking.entity").Booking>;
    findAll(): Promise<import("./entities/booking.entity").Booking[]>;
    findOne(id: string): Promise<import("./entities/booking.entity").Booking>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<import("./entities/booking.entity").Booking>;
    remove(id: string): Promise<void>;
    setActive(id: string, setActiveDto: {
        isActive: boolean;
    }): Promise<import("./entities/booking.entity").Booking>;
    setAccepted(id: string, setAcceptedDto: {
        isAccepted: boolean;
    }): Promise<import("./entities/booking.entity").Booking>;
    getBookingsByUser(userId: string): Promise<import("./entities/booking.entity").Booking[]>;
    getUnacceptedBookings(): Promise<import("./entities/booking.entity").Booking[]>;
}
