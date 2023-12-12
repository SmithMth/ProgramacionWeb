// create-booking.dto.ts
import { IsString, IsDate, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Environment } from 'src/environments/entities/environment.entity';
import { User } from 'src/users/entities/user.entity';
import { Period } from 'src/periods/entities/period.entity';

export class CreateBookingDto {
    @IsString()
    affair: string;

    @IsDate()
    fecha: Date;

    @IsBoolean()
    isAccepted: boolean;

    @IsBoolean()
    isActive: boolean;

    @ValidateNested() // Para incluir la entidad Environment completa
    @Type(() => Environment)
    environment: Environment;

    @ValidateNested() // Para incluir la entidad User completa
    @Type(() => User)
    user: User;

    @ValidateNested() // Para incluir la entidad Period completa
    @Type(() => Period)
    period: Period;
}
