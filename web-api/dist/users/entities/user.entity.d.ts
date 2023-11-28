import { Booking } from "src/bookings/entities/booking.entity";
export declare class User {
    id: number;
    email: string;
    username: string;
    lastname: string;
    password: string;
    bookings: Booking[];
}
