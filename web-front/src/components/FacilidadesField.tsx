import { useEffect, useState } from "react";
import { FacilityData} from "../interfaces/Facility.interface";
import { getFacilidades } from "../api/environment";

export const FacilidadesField = ({ value = [] as FacilityData[], setValue = (_value: FacilityData[]) => {},}) => {
    const [facilidadInput, setFacilidadInput] = useState('');
    const [facilidadesSuggestions, setFacilidadesSuggestions] = useState<FacilityData[]>([]);
    const [allFacilidades, setAllFacilidades] = useState<FacilityData[]>([]);

    const Etiqueta = (facilidad: FacilityData) => (
        <div key={facilidad.id} className="bg-blue-500 text-white px-2 py-1 rounded">
            {facilidad.name}
            <button onClick={() => handleRemoveFacilidad(facilidad)} className="ml-2">X</button>
        </div>
    );

    const handleRemoveFacilidad = (facilidad: FacilityData) => {
        const newFacilidades = value.filter(f => f.name !== facilidad.name);
        setValue(newFacilidades);
    };

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
                setValue([...value,matchingSuggestion]);
            } else {
                console.log('No se encontró ninguna facilidad coincidente');
            }

            setFacilidadesSuggestions([]);
            setFacilidadInput('');
        }
    };

    const handleAddFacilidadesSuggestion = (suggestion: FacilityData) => {
        setValue([...value,suggestion]);
        setFacilidadesSuggestions([]);
        setFacilidadInput('');
    };

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

    return (
        <>
            <label htmlFor="facilidades" className="block font-bold mb-2">Facilidades:</label>
            <div className="flex flex-wrap space-x-2">
                {value?.map((facilidad) => (
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
        </>
    );
};