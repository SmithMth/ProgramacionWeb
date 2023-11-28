import { FieldText } from './FieldText';
import { TiposAmbiente } from './TiposAmbiente';
import { EnvironmentData, EnvironmentDataDefault } from '../interfaces/Environment.interface';
import { TypesEnvironmentData } from '../interfaces/TypeEnvironment.interface';
import { FacilidadesField } from './FacilidadesField';
import { FacilityData } from '../interfaces/Facility.interface';

export const FormEnvironment = ({ environment = EnvironmentDataDefault, setEnvironment = (_value: EnvironmentData) => { }, onSave = () => { } }) => {
    const handleSave = async () => {
        onSave(); // Lógica adicional después de guardar
    };

    return (
        <div className="p-6 sm:p-5 bg-white rounded-lg shadow-xl w-11/12">
            <h2 className="text-center m-2 text-xl sm:text-2xl font-bold">Ambiente</h2>
            <div id="editForm" className="space-y-4">
                <FieldText
                    nombre="Nombre"
                    value={environment.name}
                    setValue={(val: string) => setEnvironment({ ...environment, name: val })}
                />
                <br />
                <FieldText
                    nombre="Descripcion"
                    value={environment.description}
                    setValue={(val: string) => setEnvironment({ ...environment, description: val })}
                />
                <br />
                <FieldText
                    type="number"
                    nombre="Capacidad"
                    value={environment.capacidad.toString()}
                    setValue={(val: string) => setEnvironment({ ...environment, capacidad: Number(val) || 0 })}
                />
                <br />


                <label htmlFor="activo" className="block font-bold mb-2 text-sm sm:text-base">Habilitado:</label>
                <div className="flex items-center justify-center">
                    <input
                        type="checkbox"
                        id="activo"
                        name="activo"
                        checked={environment.enabled}
                        onChange={() =>  setEnvironment({ ...environment, enabled:!environment.enabled})} 
                        className="form-checkbox h-5 w-5 text-blue-600" // Ajuste de color y tamaño
                    />
                </div>
                <br />
                <TiposAmbiente tipo={environment.typeEnvironment} setTipo={(val: TypesEnvironmentData) => setEnvironment({ ...environment, typeEnvironment: val })}></TiposAmbiente>
                <br />
                <FacilidadesField value={environment.facilities} setValue={(val: FacilityData[]) => setEnvironment({ ...environment, facilities: val })}></FacilidadesField>
                <br />
                <input
                    type="submit"
                    value="Guardar"
                    onClick={handleSave}
                    className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                />
            </div>
            <script src="/js/editar_ambiente.js"></script>
        </div>
    );
}
