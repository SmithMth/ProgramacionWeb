import { useState } from 'react';
import { EnvironmentData, EnvironmentDataDefault } from '../interfaces/Environment.interface';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';


export const Carta = ({ reserva = false, environments = EnvironmentDataDefault as EnvironmentData, deleteEnvironment = (_value: EnvironmentData) => { } }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const environment: EnvironmentData = environments;

  const handleOpenModal = () => {
    setModalOpen(!isModalOpen);
  };


  const Botones = () => {
    if (reserva) {
      return (
        <div>
          <Link to={`/reservarEnvironment/${encodeURIComponent(JSON.stringify(environment))}`}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reservar
            </button>
          </Link>
        </div>
      )
    } else {
      return (
        <div className='flex flex-col items-center'>
          <Link to={`/editEnvironment/${encodeURIComponent(JSON.stringify(environment))}`}>
            <button className="m-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              Editar
            </button>
          </Link>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => deleteEnvironment(environment)}
          >
            Eliminar
          </button>
        </div>
      )
    }
  }


  return (
    <div onClick={handleOpenModal} className="flex justify-between p-6 sm:p-5 bg-white rounded-lg shadow-xl w-11/12  mt-4">
      <div>
        <h3 className="text-xl font-bold mb-2">{environment.name}</h3>
        <p>Capacidad: {environment.capacidad}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <Botones></Botones>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setModalOpen(false)} environment={environment}></Modal>
      )}
    </div>
  );
};
