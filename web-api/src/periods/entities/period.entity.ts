import { Booking } from "src/bookings/entities/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Period {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'time' })
    startTimeString: string;

    @Column({ type: 'time' })
    endTimeString: string;

    @OneToMany(() => Booking, booking => booking.environment)
    bookings: Booking[];

    get startTime(): Time {
        return Time.fromTimeString(this.startTimeString);
    }

    set startTime(time: Time) {
        this.startTimeString = time.toTimeString();
    }

    get endTime(): Time {
        return Time.fromTimeString(this.endTimeString);
    }

    set endTime(time: Time) {
        this.endTimeString = time.toTimeString();
    }
}



export class Time {
    hours: number;
    minutes: number;

    constructor(hours: number, minutes: number) {
        this.hours = hours;
        this.minutes = minutes;
    }

    toTimeString(): string {
        // Convertir a una cadena de texto en formato de hora
        return `${this.hours.toString().padStart(2, '0')}:${this.minutes.toString().padStart(2, '0')}`;
    }

    static fromTimeString(timeString: string): Time {
        // Convertir de una cadena de texto a una instancia de Time
        const [hours, minutes] = timeString.split(':').map(Number);
        return new Time(hours, minutes);
    }
}
