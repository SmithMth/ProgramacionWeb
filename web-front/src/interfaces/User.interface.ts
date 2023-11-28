export interface UserData {
    id: number; // Opcional porque no se conoce antes de que el usuario sea creado
    email: string;
    username: string;
    lastname: string;
    // La contraseña normalmente no se incluiría en un DTO que se envía al cliente,
    // pero podría estar presente en un DTO para la creación o actualización de usuarios desde el cliente al servidor.
    password?: string;
    // No incluimos 'bookings' porque en un DTO generalmente manejamos solo los identificadores para las relaciones o los omitimos.
    // Si necesitas incluir los IDs de las reservas relacionadas, podrías agregar un campo bookingsIds?: number[].
  }
  