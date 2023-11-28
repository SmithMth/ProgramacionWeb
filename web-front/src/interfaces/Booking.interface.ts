export interface BookingData {
    id: number; // Opcional, porque no se conoce antes de crear la reserva
    affair: string;
    fecha: Date | string; // Podría ser una cadena si se espera una fecha en formato ISO desde el cliente
    environmentId: number; // Solo se necesita el ID para asociar con Environment
    userId: number; // Solo se necesita el ID para asociar con User
    periodId: number; // Solo se necesita el ID para asociar con Period
  }
  