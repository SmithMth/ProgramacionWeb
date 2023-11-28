import { Facility } from "src/facilities/entities/facility.entity";
import { Booking } from "src/bookings/entities/booking.entity";
import { TypesEnvironment } from "src/types-environments/entities/types-environment.entity";
export declare class Environment {
    id: number;
    name: string;
    description: string;
    capacidad: number;
    asset: boolean;
    enabled: boolean;
    bookings: Booking[];
    typeEnvironment: TypesEnvironment;
    facilities: Facility[];
}
