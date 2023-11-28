import { useParams } from 'react-router-dom';
import { EnvironmentData, EnvironmentDataDefault } from '../interfaces/Environment.interface';
import { useState, useEffect } from 'react';
import { FormEnvironment } from '../components/FormEnvironment';
import { updateEnvironment } from '../api/environment';

function EditEnvironment() {
    const { data } = useParams();
    let environments: EnvironmentData | undefined = data ? JSON.parse(decodeURIComponent(data)) : EnvironmentDataDefault;
    const [environment, setEnvironment] = useState<EnvironmentData | undefined>(() => environments);

    const handleSubmit = async () => {
        try {
            if (environment) {
                console.log('Tipo de Ambiente seleccionado:', environment);
                const newEnvironment = await updateEnvironment(environment);

                console.log('Ambiente actualizado:', newEnvironment);
            }
        } catch (error) {
            console.error('Error al crear el ambiente:', error);
        }
    };

    useEffect(() => {
        if (environment) {
            setEnvironment(environment);
        }
    }, [environment]);

    return (
        <>
            <FormEnvironment
                environment={environment}
                setEnvironment={(value: EnvironmentData) => setEnvironment(value)}
                onSave={handleSubmit}
            />
        </>
    );
}

export default EditEnvironment;
