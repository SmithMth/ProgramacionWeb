import { Booking } from "src/bookings/entities/booking.entity";
import { Role } from "src/roles/entities/role.entity";
export declare class User {
    id: number;
    email: string;
    username: string;
    lastname: string;
    password: string;
    bookings: Booking[];
    roles: Role[];
}
