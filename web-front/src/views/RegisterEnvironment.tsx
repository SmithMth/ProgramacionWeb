import { useState } from 'react';
import { createEnvironment, processCSV } from '../api/environment';
import { EnvironmentData, EnvironmentDataDefault } from '../interfaces/Environment.interface';
import { FormEnvironment } from '../components/FormEnvironment';

const RegisterEnvironment = () => {
    const [archivo, setArchivo] = useState<File | null>(null);
    const [environment, setEnvironment] = useState<EnvironmentData>(EnvironmentDataDefault);

    const handleSubmit = async () => {
        try {
            console.log('Tipo de Ambiente seleccionado:', environment);

            const newEnvironment = await createEnvironment(environment);
            console.log('Nuevo ambiente creado:', newEnvironment);
        } catch (error) {
            console.error('Error al crear el ambiente:', error);
        }
    };

    const handleBatchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!archivo) {
            console.log('No hay archivo seleccionado');
            return;
        }
        try {
            await processCSV(archivo);
            console.log('Todos los ambientes han sido creados');
            // Lógica adicional después de procesar el CSV...
        } catch (error) {
            console.error('Error al procesar el archivo CSV:', error);
            // Manejo de errores...
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setArchivo(e.target.files[0]);
        }
    };

    return (
        <>
            <FormEnvironment
                environment={environment}
                setEnvironment={(value: EnvironmentData) => setEnvironment(value)}
                onSave={() => handleSubmit()}
            />

            <div className="w-11/12 p-6 sm:p-10 bg-white rounded-lg shadow-xl mt-4">
                <form onSubmit={handleBatchSubmit}>
                    <h2 className="text-xl font-bold mb-3">Registro por Lote</h2>
                    <input
                        type="file"
                        id="csvFile"
                        name="csvFile"
                        accept=".csv"
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />

                    <input
                        type="submit"
                        value="Cargar CSV"
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full"
                    />
                </form>
            </div>
        </>
    );
};
export default RegisterEnvironment;