import { CreateFacilityDto } from 'src/facilities/dto/create-facility.dto';
import { CreateTypesEnvironmentDto } from 'src/types-environments/dto/create-types-environment.dto';
export declare class UpdateEnvironmentDto {
    id: number;
    name: string;
    description: string;
    capacidad: number;
    asset: boolean;
    enabled: boolean;
    typeEnvironment: CreateTypesEnvironmentDto;
    facilities: CreateFacilityDto[];
}
