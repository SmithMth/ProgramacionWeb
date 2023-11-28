import { useEffect, useState } from "react";
import { TypesEnvironmentData, TypesEnvironmentDataDefault } from "../interfaces/TypeEnvironment.interface";
import { getTiposAmbiente } from "../api/environment";


export const TiposAmbiente = ({ tipo=TypesEnvironmentDataDefault, setTipo = (_value: TypesEnvironmentData) => {} }) => {

    const [tiposAmbiente, setTiposAmbiente] = useState<TypesEnvironmentData[]>([]);

    useEffect(() => {
        const fetchTiposAmbiente = async () => {
            try {
                const tipos = await getTiposAmbiente();
                setTiposAmbiente(tipos);
            } catch (error) {
                console.error('Error al recuperar los tipos de ambiente:', error);
            }
        };
        fetchTiposAmbiente();
    }, []);

    return (
        <>
            <label htmlFor="tipoAmbiente" className="block font-bold mb-2">Tipo de Ambiente:</label>
            <select
                id="tipoAmbiente"
                value={tipo ? tipo.name : ''}
                onChange={(e) => {
                    const selectedTipo = tiposAmbiente.find(t => t.name === e.target.value);
                    setTipo(selectedTipo || TypesEnvironmentDataDefault);
                }}
                className="block w-full p-2 border border-blue-500 rounded mb-4"
            >
                <option value="">Seleccione</option>
                {tiposAmbiente.map((tipo) => (
                    <option key={tipo.name} value={tipo.name}>
                        {tipo.name}
                    </option>
                ))}
            </select>
        </>
    );
};