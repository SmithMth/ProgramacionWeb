import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Swich } from '../components/Swich';
import { CapacidadMaxMin } from '../components/CapacidadMaxMin';
import { Habilitado } from '../components/Habilitado';
import { FacilidadesField } from '../components/FacilidadesField';
import { TiposField } from '../components/TiposField';
import { TypesEnvironmentData } from '../interfaces/TypeEnvironment.interface';
import { FacilityData } from '../interfaces/Facility.interface';
import { Periodos } from '../components/Periodos';
import { PeriodData, PeriodDefault } from '../interfaces/Period.interface';
import { EnvironmentData } from '../interfaces/Environment.interface';
import { getAllEnvironmentsWithDetails } from '../api/environment';
import { Carta } from '../components/Carta';

function ReservarEnvironment() {
  const [filtro, setFiltro] = useState<boolean>(false)
  const [capacidad, setCapacidad] = useState({ min: 0, max: 999 });
  const [enabled, setEnabled] = useState<boolean>(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tipos, setTipos] = useState<TypesEnvironmentData[]>([])
  const [facilidades, setFacilidades] = useState<FacilityData[]>([])
  const [periodo, setPeriodo] = useState<PeriodData>(PeriodDefault)
  const [environments, setEnvironments] = useState<EnvironmentData[]>([])
  const [environmentsOcupados, setEnvironmentsOcupados] = useState<EnvironmentData[]>([])

  const fetchEnvironments = async () => {
    try {
      const environments = await getAllEnvironmentsWithDetails(); // Obtén la lista de todas las facilidades
      setEnvironments(environments);
      console.log(environments)
    } catch (error) {
      console.error('Error al recuperar los ambientes:', error);
    }
  };

  const fetchEnvironmentsOcupados = async()=>{
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchEnvironments();
  }, []);

  const filteredEnvironments = environments.filter((environment) => {
    const capacidadF = environment.capacidad >= capacidad.min && environment.capacidad <= capacidad.max;
    const enabledF = !enabled || environment.enabled === enabled;
    const tipoF = tipos.length === 0 || tipos.some((tipo) => environment.typeEnvironment?.name === tipo.name);
    const facilidadesF =
      facilidades.length === 0 ||
      facilidades.every((facilidad) => environment.facilities.some((f) => f.name === facilidad.name));
    if (!filtro) return true
    return capacidadF && enabledF && tipoF && facilidadesF;
  });


  return (
    <>
      <div className="p-6 sm:p-5 bg-white rounded-lg shadow-xl w-11/12">
        <Swich name='Reservar Ambientes' value={filtro} setValue={setFiltro}></Swich>
        <div className="space-y-4">
          <CapacidadMaxMin value={capacidad} set={(mi, ma) => setCapacidad({ min: mi, max: ma })} ></CapacidadMaxMin>
          <Habilitado value={enabled} setValue={setEnabled}></Habilitado>
          <div className="mb-4">
            <label htmlFor="datePicker" className="block font-bold mb-2 text-sm sm:text-base">
              Selecciona una fecha:
            </label>
            <DatePicker
              id="datePicker"
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date as Date)}
              className="w-full p-2 border border-blue-500 rounded text-sm"
            />
          </div>
          <TiposField value={tipos} setValue={setTipos}></TiposField>
          <FacilidadesField value={facilidades} setValue={setFacilidades}></FacilidadesField>
          <Periodos periodo={periodo} setPeriodo={setPeriodo}></Periodos>
        </div>
      </div>
      <>
        {filteredEnvironments.map((environment) => (
          <Carta reserva={true} key={environment.id} environments={environment}></Carta>
        ))}
      </>
    </>
  );
}

export default ReservarEnvironment;
