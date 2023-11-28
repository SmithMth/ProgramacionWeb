export interface TypesEnvironmentData {
  id?: number; // Opcional porque no se conoce antes de que el tipo de ambiente sea creado
  name: string;
  description?: string; // Opcional porque es nullable
  // No incluimos el campo 'environments' porque generalmente manejamos solo los identificadores para las relaciones en un DTO
  // Si necesitas incluir los IDs de los ambientes relacionados, podrías agregar un campo environmentsIds?: number[];
}

export const TypesEnvironmentDataDefault: TypesEnvironmentData = {
  name: '',
  description: '',
};