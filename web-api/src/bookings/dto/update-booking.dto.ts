import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateBookingDto {
    @IsString()
    @IsOptional()
    affair?: string;

    @IsDate()
    @IsOptional()
    fecha?: Date;
}
