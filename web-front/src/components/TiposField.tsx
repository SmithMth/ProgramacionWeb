import { useEffect, useState } from "react";
import { TypesEnvironmentData } from "../interfaces/TypeEnvironment.interface";
import { getTiposAmbiente } from "../api/environment";

export const TiposField = ({ value = [] as TypesEnvironmentData[], setValue = (_value: TypesEnvironmentData[]) => {},}) => {
    const [tipoInput, setTipodInput] = useState('');
    const [tipoesSuggestions, setTiposSuggestions] = useState<TypesEnvironmentData[]>([]);
    const [allTipos, setAllTipos] = useState<TypesEnvironmentData[]>([]);

    const Etiqueta = (tipo: TypesEnvironmentData) => (
        <div key={tipo.id} className="bg-blue-500 text-white px-2 py-1 rounded">
            {tipo.name}
            <button onClick={() => handleRemoveTipod(tipo)} className="ml-2">X</button>
        </div>
    );

    const handleRemoveTipod = (tipo: TypesEnvironmentData) => {
        const newTipos = value.filter(f => f.name !== tipo.name);
        setValue(newTipos);
    };

    const handleTipodInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.toLowerCase();
        setTipodInput(input);

        const suggestions = allTipos.filter(tipo =>
            tipo.name.toLowerCase().includes(input)
        );

        setTiposSuggestions(suggestions);
    };

    const handleAddTipod = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && tipoInput.trim() !== '') {
            // Si hay sugerencias y la entrada coincide exactamente con una sugerencia, agrega la sugerencia
            const matchingSuggestion = tipoesSuggestions.find(suggestion =>
                suggestion.name.toLowerCase() === tipoInput.trim().toLowerCase()
            );

            if (matchingSuggestion) {
                setValue([...value,matchingSuggestion]);
            } else {
                console.log('No se encontró ninguna tipo coincidente');
            }

            setTiposSuggestions([]);
            setTipodInput('');
        }
    };

    const handleAddTiposSuggestion = (suggestion: TypesEnvironmentData) => {
        setValue([...value,suggestion]);
        setTiposSuggestions([]);
        setTipodInput('');
    };

    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const tipoesList = await getTiposAmbiente(); // Obtén la lista de todas las tipoes
                setAllTipos(tipoesList);
            } catch (error) {
                console.error('Error al recuperar las tipoes:', error);
            }
        };
        fetchTipos();
    }, []);

    return (
        <>
            <label htmlFor="tipoes" className="block font-bold mb-2">Tipodes:</label>
            <div className="flex flex-wrap space-x-2">
                {value?.map((tipo) => (
                    Etiqueta(tipo)
                ))}
            </div>
            <input
                type="text"
                id="tipoes"
                value={tipoInput}
                onChange={handleTipodInputChange}
                onKeyDown={handleAddTipod}
                className="w-full p-2 border border-blue-500 rounded mt-2"
            />{tipoesSuggestions.length > 0 && (
                <div className="suggestions">
                    {tipoesSuggestions.map((suggestion) => (
                        <div key={suggestion.id} onClick={() => handleAddTiposSuggestion(suggestion)}>
                            {suggestion.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
