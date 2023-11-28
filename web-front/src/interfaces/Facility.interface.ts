export interface FacilityData {
    id?: number; // Opcional porque no se conoce antes de que la instalación sea creada
    name: string;
    description: string; // Opcional porque es nullable
    // No incluimos el campo 'environments' porque generalmente manejamos solo los identificadores para las relaciones en un DTO
  }
  
export const FacilityDataDefault: FacilityData={
    name:'',
    description:''
}