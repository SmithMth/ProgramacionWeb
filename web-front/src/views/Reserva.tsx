import { useState } from 'react'
import DatePicker from 'react-datepicker';

import { useParams } from 'react-router-dom';
import { EnvironmentData, EnvironmentDataDefault } from '../interfaces/Environment.interface';
import { PeriodData, PeriodDefault } from '../interfaces/Period.interface';
import { Periodos } from '../components/Periodos';
import { crearReserva } from '../api/reservas';
import { FieldText } from '../components/FieldText';

function Reserva() {
  const { data } = useParams();
  let environments: EnvironmentData | undefined = data ? JSON.parse(decodeURIComponent(data)) : EnvironmentDataDefault;
  const environment = environments || EnvironmentDataDefault;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [periodo, setPeriodo] = useState<PeriodData>(PeriodDefault)
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState<string | null>(null);

  const reservarEntradas = async () => {
    try {
      const resultadoReserva = await crearReserva({ environment, periodo, selectedDate, asunto });
  
      if (resultadoReserva?.success) {
        setMensaje('Reserva realizada con éxito');
      } else {
        setMensaje(`Error al realizar la reserva: ${resultadoReserva?.error || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al realizar reserva:', error);
      setMensaje('Error al realizar la reserva');
    }
  };
  
  

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/3 md:mr-4 bg-white p-6 rounded-lg mb-4 md:mb-0">
        <h1 className="mb-4 font-bold text-2xl">Detalles del Ambiente</h1>

        <div className="w-full mb-4">
          <p className="mb-1"><span className="font-bold">Nombre:</span> {environment.name}</p>
          <p className="mb-1"><span className="font-bold">Descripción:</span> {environment.description}</p>
          <p className="mb-1"><span className="font-bold">Capacidad:</span> {environment.capacidad.toString()}</p>
          <p className="mb-1"><span className="font-bold">Habilitado:</span> {environment.enabled ? 'Sí' : 'No'}</p>
          <p className="mb-1"><span className="font-bold">Tipo Nombre:</span> {environment.typeEnvironment?.name}</p>
          <p className="mb-1"><span className="font-bold">Tipo Descripción:</span> {environment.typeEnvironment?.description}</p>
        </div>

        <div>
          <h2 className="mb-2 font-bold text-xl">Facilidades</h2>
          {environment.facilities.map((facility, index) => (
            <div key={index} className="mb-2">
              <p className="font-bold mb-1">{facility.name}</p>
              <p className="mb-1">{facility.description}</p>
            </div>
          ))}

        </div>
      </div>
      <div className="md:w-1/3 p-6 sm:p-5 bg-white rounded-lg shadow-xl mt-4">
        <FieldText
          nombre="Asunto"
          value={asunto}
          setValue={(val: string) => setAsunto(val)}
        />
        <div className="flex flex-col sm:flex-row mb-4 sm:mb-0 ">
          <label htmlFor="datePicker" className="block font-bold text-sm sm:text-base mr-2">
            Selecciona una fecha:
          </label>
          <DatePicker
            id="datePicker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date as Date)}
            className="w-full p-2 border border-blue-500 rounded text-sm"
          />
        </div>

        <Periodos periodo={periodo} setPeriodo={setPeriodo}></Periodos>

        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => { reservarEntradas() }}
          >
            Reservar
          </button>
        </div>

      </div>
      {mensaje && <p className={`text-center mt-4 ${mensaje.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{mensaje}</p>}
    </div>
  );
}

export default Reserva