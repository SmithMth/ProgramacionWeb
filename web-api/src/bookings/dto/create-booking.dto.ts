// create-booking.dto.ts
import { IsString, IsDate, IsBoolean, ValidateNested, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { Environment } from 'src/environments/entities/environment.entity';
import { User } from 'src/users/entities/user.entity';
import { Period } from 'src/periods/entities/period.entity';
import { CreatePeriodDto } from 'src/periods/dto/create-period.dto';

export class CreateBookingDto {
    @IsString()
    affair: string;

    @IsString()
    fecha: string;

    @IsBoolean()
    isAccepted: boolean;

    @IsBoolean()
    isActive: boolean;

    @IsNumber() // Para incluir la entidad Environment completa
    environmentId: number;

    @IsNumber() 
    userId: number;
    
    @IsString()
    startTime: string;

    @IsString()
    endTime: string;
}
