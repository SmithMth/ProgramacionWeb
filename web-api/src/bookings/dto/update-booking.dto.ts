// update-booking.dto.ts

import { IsString, IsDate, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Environment } from 'src/environments/entities/environment.entity';
import { User } from 'src/users/entities/user.entity';
import { Period } from 'src/periods/entities/period.entity';

export class UpdateBookingDto {
    @IsString()
    @IsOptional()
    affair?: string;

    @IsDate()
    @IsOptional()
    fecha?: Date;

    @IsBoolean()
    @IsOptional()
    isAccepted?: boolean;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ValidateNested({ each: true }) // Para incluir la entidad Environment completa
    @Type(() => Environment)
    @IsOptional()
    environment?: Environment;

    @ValidateNested({ each: true }) // Para incluir la entidad User completa
    @Type(() => User)
    @IsOptional()
    user?: User;

    @ValidateNested({ each: true }) // Para incluir la entidad Period completa
    @Type(() => Period)
    @IsOptional()
    period?: Period;
}
