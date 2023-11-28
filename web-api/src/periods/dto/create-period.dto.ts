import { IsString, Matches } from 'class-validator';

export class CreatePeriodDto {
    @IsString()
    @Matches(/^\d{2}:\d{2}$/, { message: 'startTime must be in the format HH:MM' })
    startTime: string;

    @IsString()
    @Matches(/^\d{2}:\d{2}$/, { message: 'endTime must be in the format HH:MM' })
    endTime: string;
}
