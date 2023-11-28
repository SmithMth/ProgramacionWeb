// reservas.ts

import axios from 'axios';

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
  try {
    const response = await axios.post(`${apiUrl}/ruta-de-tu-endpoint-de-creacion-de-reserva`, datosReserva);
    return response.data;
  } catch (error) {
    console.error('Error al crear reserva:', error);
    throw error;
  }
};

// Puedes agregar más funciones según las operaciones que necesites realizar
