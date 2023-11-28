import { IsString, IsDate } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    affair: string;

    @IsDate()
    fecha: Date;
}
