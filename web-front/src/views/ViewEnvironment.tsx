import { useEffect, useState } from 'react';
import { deleteEnvironmentById, getAllEnvironmentsWithDetails, getFacilidades, getTiposAmbiente } from '../api/environment';
import { TypesEnvironmentData } from '../interfaces/TypeEnvironment.interface';
import { FacilityData } from '../interfaces/Facility.interface';
import { EnvironmentData } from '../interfaces/Environment.interface';
import { Carta } from '../components/Carta';

function ViewEnvironment() {
    const [filterCapacidad, setFilterCapacidad] = useState({ min: 0, max: 999 });

    const [filterTipos, setTipos] = useState<TypesEnvironmentData[]>([])
    const [filterFacilidades, setFacilidades] = useState<FacilityData[]>([])

    const [filterHabilitado, setHabilitado] = useState<boolean>(false);
    const [filterFiltrar, setFiltrar] = useState<boolean>(false);

    const [tiposAmbiente, setTiposAmbiente] = useState<TypesEnvironmentData[]>([]);
    const [allFacilidades, setAllFacilidades] = useState<FacilityData[]>([]);

    const [facilidadInput, setFacilidadInput] = useState('');
    const [tipoInput, setTipoInput] = useState('');

    const [facilidadesSuggestions, setFacilidadesSuggestions] = useState<FacilityData[]>([]);
    const [tiposSuggestions, setTiposSuggestions] = useState<TypesEnvironmentData[]>([]);

    const [environments, setEnvironments] = useState<EnvironmentData[]>([])

    const handleFacilidadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setFacilidadInput(input);

        const suggestions = allFacilidades.filter(facilidad =>
            facilidad.name.toLowerCase().includes(input)
        );

        setFacilidadesSuggestions(suggestions);
    };


    const handleAddFacilidad = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && facilidadInput.trim() !== '') {
            // Si hay sugerencias y la entrada coincide exactamente con una sugerencia, agrega la sugerencia
            const matchingSuggestion = facilidadesSuggestions.find(suggestion =>
                suggestion.name.toLowerCase() === facilidadInput.trim().toLowerCase()
            );

            if (matchingSuggestion) {
                setFacilidades((prevFacilidades) => [
                    ...prevFacilidades,
                    matchingSuggestion
                ]);
            } else {
                console.log('No se encontró ninguna facilidad coincidente');
            }

            setFacilidadesSuggestions([]);
            setFacilidadInput('');
        }
    };

    const deleteEnvironment = async (environment: EnvironmentData) => {
        try {
            if (environment.id) {
                const response = await deleteEnvironmentById(environment.id);
                
            }
        } catch (error) {
            console.error('Error al intentar eliminar el ambiente:', error);
        }
    };

    const handleTipoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setTipoInput(input);
        const suggestions = tiposAmbiente.filter(tipo =>
            tipo.name.toLowerCase().includes(input)
        );

        setTiposSuggestions(suggestions);
    };

    const handleAddTipo = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tipoInput.trim() !== '') {
            const matchingSuggestion = tiposSuggestions.find(suggestion =>
                suggestion.name.toLowerCase() === tipoInput.trim().toLowerCase()
            );

            if (matchingSuggestion) {
                setTipos((prevTipos) => [
                    ...prevTipos,
                    matchingSuggestion
                ]);
            } else {
                console.log('No se encontró ninguna tipo coincidente');
            }

            setTiposSuggestions([]);
            setTipoInput('');
        }
    };

    const Etiqueta = (facilidad: FacilityData) => (
        <div key={facilidad.id} className="bg-blue-500 text-white px-2 py-1 rounded">
            {facilidad.name}
            <button onClick={() => handleRemoveFacilidad(facilidad)} className="ml-2">X</button>
        </div>
    );

    const EtiquetaTipo = (tipo: TypesEnvironmentData) => (
        <div key={tipo.id} className="bg-blue-500 text-white px-2 py-1 rounded">
            {tipo.name}
            <button onClick={() => handleRemoveTipo(tipo)} className="ml-2">X</button>
        </div>
    );


    const handleRemoveFacilidad = (facilidad: FacilityData) => {
        const newFacilidades = filterFacilidades.filter(f => f.name !== facilidad.name);
        setFacilidades(newFacilidades);
    };

    const handleRemoveTipo = (tipo: TypesEnvironmentData) => {
        const newFacilidades = filterTipos.filter(f => f.name !== tipo.name);
        setTipos(newFacilidades);
    };

    useEffect(() => {
        const fetchEnvironments = async () => {
            try {
                const environments = await getAllEnvironmentsWithDetails(); // Obtén la lista de todas las facilidades
                setEnvironments(environments);
            } catch (error) {
                console.error('Error al recuperar los ambientes:', error);
            }
        };
        fetchEnvironments();

    }, [deleteEnvironment]);

    useEffect(() => {
        const fetchFacilidades = async () => {
            try {
                const facilidadesList = await getFacilidades(); // Obtén la lista de todas las facilidades
                setAllFacilidades(facilidadesList);
            } catch (error) {
                console.error('Error al recuperar las facilidades:', error);
            }
        };
        fetchFacilidades();
    }, []);

    useEffect(() => {
        const fetchTiposAmbiente = async () => {
            try {
                const tipos = await getTiposAmbiente(); // Suponiendo que esto ya devuelve TypesEnvironmentData[]
                setTiposAmbiente(tipos);
            } catch (error) {
                console.error('Error al recuperar los tipos de ambiente:', error);
            }
        };

        fetchTiposAmbiente();
    }, []);

    const handleAddTipoSuggestion = (suggestion: TypesEnvironmentData) => {
        setTipos((prevTipos) => [
            ...prevTipos,
            suggestion
        ]);
        setTiposSuggestions([]);
        setTipoInput('');
    };


    const handleAddFacilidadesSuggestion = (suggestion: FacilityData) => {
        setFacilidades((prevTipos) => [
            ...prevTipos,
            suggestion
        ]);
        setFacilidadesSuggestions([]);
        setFacilidadInput('');
    };
    // ...

    const filteredEnvironments = environments.filter((environment) => {
        // Filtra por capacidad
        const meetsCapacityFilter =
            environment.capacidad >= filterCapacidad.min && environment.capacidad <= filterCapacidad.max;

        // Filtra por habilitado
        const meetsHabilitadoFilter = !filterHabilitado || environment.enabled === filterHabilitado;

        // Filtra por tipos de ambiente
        const meetsTiposFilter =
            filterTipos.length === 0 || filterTipos.some((tipo) => environment.typeEnvironment?.name === tipo.name);

        // Filtra por facilidades
        const meetsFacilidadesFilter =
            filterFacilidades.length === 0 ||
            filterFacilidades.every((facilidad) => environment.facilities.some((f) => f.name === facilidad.name));
        // Retorna true si cumple con todos los filtros
        if (!filterFiltrar) {
            return true
        }
        return meetsCapacityFilter && meetsHabilitadoFilter && meetsTiposFilter && meetsFacilidadesFilter;
    });


    return (
        <>
        <div className="p-6 sm:p-10 bg-white rounded-lg shadow-xl">
            <div className="flex">
                <h3 className="m-2 text-xl sm:text-2xl font-bold">Ambientes Registrados</h3>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="filtroSwitch"
                        checked={filterFiltrar}
                        onChange={() => setFiltrar(!filterFiltrar)}
                        className="hidden"
                    />
                    <label htmlFor="filtroSwitch" className="flex items-center cursor-pointer">
                        <div className={`w-14 h-8 ${filterFiltrar ? 'bg-green-500' : 'bg-gray-400'} rounded-full p-1 duration-300 ease-in-out`}>
                            <div className={`w-6 h-6 ${filterFiltrar ? 'bg-white' : 'bg-gray-300'} rounded-full shadow-md transform ${filterFiltrar ? 'translate-x-full' : 'translate-x-0'} transition-transform duration-300 ease-in-out`}></div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <div className="sm:w-1/2">
                    <label htmlFor="capacidad" className="block font-bold mb-2 text-sm sm:text-base">Capacidad:</label>
                    <div className="flex flex-col sm:flex-row justify-around space-y-4 sm:space-y-0 sm:space-x-4">
                        <h1>Minimo</h1>
                        <input
                            type="number"
                            id="capacidad"
                            name="capacidad"
                            min="1"
                            required
                            value={filterCapacidad.min}
                            onChange={(e) => setFilterCapacidad(prevEnvironment => ({ ...prevEnvironment, min: (Number(e.target.value)) }))}
                            className="w-full p-2 border border-blue-500 rounded text-sm"
                        />
                        <h1>Maximo</h1>
                        <input
                            type="number"
                            id="capacidad"
                            name="capacidad"
                            min="1"
                            required
                            value={filterCapacidad.max}
                            onChange={(e) => setFilterCapacidad(prevEnvironment => ({ ...prevEnvironment, max: (Number(e.target.value)) }))}
                            className="w-full p-2 border border-blue-500 rounded text-sm"
                        />
                    </div>

                </div>

                <div className="sm:w-1/2">
                    <label htmlFor="activo" className="block font-bold mb-2 text-sm sm:text-base">Habilitado:</label>
                    <div className="flex items-center justify-center">
                        <input
                            type="checkbox"
                            id="activo"
                            name="activo"
                            checked={filterHabilitado}
                            onChange={() => setHabilitado(!filterHabilitado)} className="form-checkbox h-5 w-5 text-blue-600" // Ajuste de color y tamaño
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="tipos" className="block font-bold mb-2">Tipos de Ambiente:</label>
                    <div className="flex flex-wrap space-x-2">
                        {filterTipos?.map((tipo) => (
                            EtiquetaTipo(tipo)
                        ))}
                    </div>
                    <input
                        type="text"
                        id="tipos"
                        value={tipoInput}
                        onChange={handleTipoInputChange}
                        onKeyDown={handleAddTipo}
                        className="w-full p-2 border border-blue-500 rounded mt-2"
                    />{tiposSuggestions.length > 0 && (
                        <div className="suggestions">
                            {tiposSuggestions.map((suggestion) => (
                                <div key={suggestion.id} onClick={() => handleAddTipoSuggestion(suggestion)}>
                                    {suggestion.name}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <div>
                    <label htmlFor="facilidades" className="block font-bold mb-2">Facilidades:</label>
                    <div className="flex flex-wrap space-x-2">
                        {filterFacilidades?.map((facilidad) => (
                            Etiqueta(facilidad)
                        ))}
                    </div>
                    <input
                        type="text"
                        id="facilidades"
                        value={facilidadInput}
                        onChange={handleFacilidadInputChange}
                        onKeyDown={handleAddFacilidad}
                        className="w-full p-2 border border-blue-500 rounded mt-2"
                    />{facilidadesSuggestions.length > 0 && (
                        <div className="suggestions">
                            {facilidadesSuggestions.map((suggestion) => (
                                <div key={suggestion.id} onClick={() => handleAddFacilidadesSuggestion(suggestion)}>
                                    {suggestion.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
        <>
        {filteredEnvironments.map((environment) => (
                    <Carta key={environment.id} environments={environment} deleteEnvironment={(_value) => deleteEnvironment(_value)}></Carta>
                ))}
        </>
        </>
    );
}

export default ViewEnvironment