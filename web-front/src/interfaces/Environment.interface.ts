import { FacilityData } from "./Facility.interface";
import { TypesEnvironmentData, TypesEnvironmentDataDefault } from "./TypeEnvironment.interface";

export interface EnvironmentData {
    id?: number; // Opcional porque no se conoce antes de crear el ambiente
    name: string;
    description?: string; // Opcional porque es nullable
    capacidad: number;
    asset: true; // Por defecto, este campo será true, así que podría ser opcional
    enabled: boolean;
    typeEnvironment?: TypesEnvironmentData;
    facilities: FacilityData[];
}

export const EnvironmentDataDefault: EnvironmentData = {
    name: '',
    capacidad: 0,
    asset: true,
    enabled: true, // o true según tus necesidype
    facilities: [],
};