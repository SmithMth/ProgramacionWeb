import { IsString, IsBoolean, IsNumber, IsOptional, Length, IsNotEmpty, IsInt } from 'class-validator';
import { CreateFacilityDto } from 'src/facilities/dto/create-facility.dto';
import { CreateTypesEnvironmentDto } from 'src/types-environments/dto/create-types-environment.dto';

export class UpdateEnvironmentDto {
    @IsInt()
    @IsNotEmpty()
    id: number;

    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    capacidad: number;

    @IsBoolean()
    @IsOptional()
    asset: boolean;

    @IsBoolean()
    @IsOptional()
    enabled: boolean;

    @IsNotEmpty()
    typeEnvironment: CreateTypesEnvironmentDto;

    @IsNotEmpty() // Asegura que la propiedad no esté vacía
    facilities: CreateFacilityDto[];
}
