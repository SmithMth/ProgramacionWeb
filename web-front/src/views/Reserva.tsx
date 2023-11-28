import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { EnvironmentData, EnvironmentDataDefault } from '../interfaces/Environment.interface';

function Reserva() {
  const { data } = useParams();
  let environments: EnvironmentData | undefined = data ? JSON.parse(decodeURIComponent(data)) : EnvironmentDataDefault;
  const [environment, setEnvironment] = useState<EnvironmentData>(() => environments || EnvironmentDataDefault);

  return (
    <div className="bg-white p-6 rounded-lg">
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


  )
}

export default Reserva