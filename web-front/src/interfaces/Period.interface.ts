export interface PeriodData {
    id?: number; // Opcional porque no se conoce antes de que el período sea creado
    startTimeString: string; // Formato 'HH:mm'
    endTimeString: string; // Formato 'HH:mm'
    // No incluimos 'bookings' porque en un DTO generalmente manejamos solo los identificadores para las relaciones o los omitimos
}

export interface TimeData {
    hours: number;
    minutes: number;
}

export const PeriodDefault: PeriodData={
    startTimeString:'',
    endTimeString:''
}