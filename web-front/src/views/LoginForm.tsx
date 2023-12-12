import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';


const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '', });
    const navigate = useNavigate(); // Hook para manejar la navegación

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await login(formData.email, formData.password);
            console.log('Respuesta del servidor:', response);

            // Guarda la información del usuario en localStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('token', response.token);
            localStorage.setItem('roles', JSON.stringify(response.roles));

            // Navega a la pantalla deseada (puedes cambiar '/home' según tu lógica)
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6 sm:p-10 bg-white rounded-lg shadow-xl">
            <img
                src="src/images/umss.png"
                alt="Descripción de la imagen"
                className="mx-auto mb-4 w-24 sm:w-32 md:w-40 lg:w-48" // Ajusta el tamaño de manera responsiva
            />
            <h2 className="text-center text-xl sm:text-2xl mb-4 sm:mb-6">Iniciar Sesión</h2>

            <form onSubmit={handleLogin} className="flex flex-col items-center">
                {['email', 'password'].map((field) => (
                    <input
                        key={field}
                        type={field === 'password' ? 'password' : 'text'}
                        name={field}
                        placeholder={field === 'email' ? 'Usuario' : 'Contraseña'}
                        required
                        value={formData[field as keyof typeof formData]}
                        onChange={handleChange}
                        className="w-full sm:w-3/3 p-2 mb-3 border border-gray-300 rounded"
                    />
                ))}

                <button
                    type="submit"
                    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer w-full"
                    >
                    Entrar
                </button>
            </form>
        </div>
    );
};
export default LoginForm;