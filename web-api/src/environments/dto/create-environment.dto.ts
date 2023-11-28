import { IsString, IsBoolean, IsNumber, IsOptional, Length, IsInt, IsNotEmpty } from 'class-validator';
import { CreateFacilityDto } from 'src/facilities/dto/create-facility.dto';
import { CreateTypesEnvironmentDto } from 'src/types-environments/dto/create-types-environment.dto';

export class CreateEnvironmentDto {
    @IsString()
    @Length(1, 100)
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    capacidad: number;

    @IsBoolean()
    asset: boolean;

    @IsBoolean()
    enabled: boolean;

    @IsNotEmpty()
    typeEnvironment: CreateTypesEnvironmentDto;

    @IsNotEmpty() // Asegura que la propiedad no esté vacía
    facilities: CreateFacilityDto[];
}
