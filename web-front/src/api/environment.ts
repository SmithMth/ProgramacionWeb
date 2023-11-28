// environment.ts
import Papa from 'papaparse';
import { EnvironmentData } from "../interfaces/Environment.interface";
import { TypesEnvironmentData } from "../interfaces/TypeEnvironment.interface";
import { FacilityData } from '../interfaces/Facility.interface';

// Función genérica para manejar respuestas de la API
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Error en la solicitud a la API');
  }
  return response.json();
}

// Función genérica para realizar peticiones a la API
async function apiRequest<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
  const headers = { 'Content-Type': 'application/json' };
  const config: RequestInit = {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, config);
    return handleResponse<T>(response);
  } catch (error) {
    console.error(`Error al realizar la petición ${method} en /api/${endpoint}:`, error);
    throw error;
  }
}

/**
 * Función para crear un nuevo ambiente.
 * @param {EnvironmentData} environmentData Los datos del nuevo ambiente.
 * @returns {Promise<any>} Una promesa con la respuesta del servidor.
 */
export function createEnvironment(environmentData: EnvironmentData): Promise<any> {
  return apiRequest<any>('environments', 'POST', environmentData);
}

export function updateEnvironment(environmentData: EnvironmentData): Promise<any> {
  return apiRequest<any>('environments', 'PATCH', environmentData);
}

/**
 * Función para recuperar los tipos de ambiente desde el servidor.
 * @returns {Promise<TipoAmbiente[]>} Una promesa con la lista de tipos de ambiente.
 */
export function getTiposAmbiente(): Promise<TypesEnvironmentData[]> {
  return apiRequest<TypesEnvironmentData[]>('types-environments');
}

/**
 * Procesa un archivo CSV y crea ambientes en el servidor.
 * @param {File} file El archivo CSV a procesar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando todos los ambientes han sido creados.
 */

interface ParseResult {
  data: EnvironmentData[];
  errors: any[]; // Reemplazar con una estructura de error adecuada si es posible
  meta: { [key: string]: any }; // Reemplazar con una estructura de meta adecuada si es posible
}

// ...

export async function processCSV(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true, // Esto puede estar agregando campos adicionales, verifica la documentación de Papa.parse
      complete: async (results: ParseResult) => {
        const ambientes: EnvironmentData[] = results.data;
        try {
          for (const ambienteData of ambientes) {
            // Convertir las propiedades al tipo correcto
            ambienteData.capacidad = Number(ambienteData.capacidad);
            ambienteData.asset = true;
            ambienteData.enabled = String(ambienteData.enabled).toLowerCase() === 'true' || String(ambienteData.enabled).toLowerCase() === 'si';
            ambienteData.typeEnvironment = ambienteData.typeEnvironment;

            // Agregar facilidades al DTO si existen
            const facilityData: FacilityData[] = Array.isArray(ambienteData.facilities) ? ambienteData.facilities : [];
            const createEnvironmentDto: EnvironmentData = {
              ...ambienteData,
              facilities: facilityData.map((facility) => ({
                id: facility.id || undefined,
                name: facility.name,
                description: facility.description || '',
              })),
            };
            
            // Eliminar el campo __parsed_extra si existe
            delete (createEnvironmentDto as any).__parsed_extra;
            
                   
            // Eliminar el campo __parsed_extra
            await createEnvironment(createEnvironmentDto);
          }
          resolve();
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}

// ...


/**
 * Función para recuperar las facilidades desde el servidor.
 * @returns {Promise<TypesEnvironmentData[]>} Una promesa con la lista de facilidades.
 */
export function getFacilidades(): Promise<FacilityData[]> {
  return apiRequest<FacilityData[]>('facilities');
}


/**
 * Función para obtener todos los ambientes con detalles.
 * @returns {Promise<EnvironmentData[]>} Una promesa con la lista de ambientes con detalles.
 */
export function getAllEnvironmentsWithDetails(): Promise<EnvironmentData[]> {
  return apiRequest<EnvironmentData[]>('environments/detalle');
}

/**
 * Elimina un ambiente por su ID.
 * @param {number} environmentId El ID del ambiente a eliminar.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el ambiente ha sido eliminado.
 */
export function deleteEnvironmentById(environmentId: number): Promise<void> {
  return apiRequest<void>(`environments/${environmentId}`, 'DELETE');
}
