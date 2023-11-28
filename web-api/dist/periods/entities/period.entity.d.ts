import { Booking } from "src/bookings/entities/booking.entity";
export declare class Period {
    id: number;
    private startTimeString;
    private endTimeString;
    bookings: Booking[];
    get startTime(): Time;
    set startTime(time: Time);
    get endTime(): Time;
    set endTime(time: Time);
}
export declare class Time {
    hours: number;
    minutes: number;
    constructor(hours: number, minutes: number);
    toTimeString(): string;
    static fromTimeString(timeString: string): Time;
}
