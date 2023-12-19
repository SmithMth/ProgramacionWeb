import axios from 'axios';
import { BookingData } from '../interfaces/Booking.interface';
import { format } from 'date-fns';

// URL de tu API en localhost
const apiUrl = 'http://localhost:3000/api';

// Ejemplo de función para obtener reservas
export const obtenerPeriodos = async () => {
  try {
    const response = await axios.get(`${apiUrl}/periods`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reservas:', error);
    throw error;
  }
};

// Ejemplo de función para crear una reserva
export const crearReserva = async (datosReserva: any) => {
  if (!datosReserva) {
    console.error('Los datos de la reserva son nulos o indefinidos.');
    return null; // O lanza un error o maneja la situación de datos no válidos según tus requisitos
  }

  const { environment, periodo, selectedDate, asunto } = datosReserva;

  if (!environment || !periodo || !selectedDate || !asunto) {
    console.error('Los datos necesarios para la reserva son incompletos.');
    return null; // O lanza un error o maneja la situación de datos incompletos según tus requisitos
  }

  const user = localStorage.getItem('user');
  const usuario = user ? JSON.parse(user) : null;
  
  if (!usuario || !usuario.id) {
    console.error('No se pudo obtener el usuario o su ID desde el almacenamiento local.');
    return null; // O maneja la situación de usuario no válido según tus requisitos
  }
    
  if (!usuario || !usuario.id) {
    console.error('No se pudo obtener el usuario o su ID desde el almacenamiento local.');
    return null; // O lanza un error o maneja la situación de usuario no válido según tus requisitos
  }
  console.log(selectedDate)
  const reserva: BookingData = {
    affair: asunto, // Asegúrate de proporcionar un valor adecuado para el affair según tus requisitos
    fecha: new Date(format(selectedDate, 'yyyy-MM-dd HH:mm:ssXXX')), // Convertir la fecha a una cadena ISO
    environmentId: environment.id, // Solo se necesita el ID para asociar con Environment
    userId: usuario.id, // Solo se necesita el ID para asociar con User
    startTime: periodo.startTimeString,
    endTime: periodo.endTimeString,
    isAccepted: false, // Establece un valor booleano según tus requisitos
    isActive: false, 
  };

  try {
    const response = await axios.post(`${apiUrl}/bookings`, reserva, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return { success: true, data: response.data };

  } catch (error: any) {
    console.error('Error al crear reserva:', error);
    console.log('Detalles del error:', error.response);
    return { success: false, error: error.response?.data?.message || 'Error al realizar la reserva' };
  }
};
